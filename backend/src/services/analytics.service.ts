// src/services/analytics.service.ts

interface RequestLog {
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  duration: number;
  ip: string;
  userAgent: string;
  planetId?: string;
}

interface Metrics {
  totalRequests: number;
  errors: number;
  errorRate: number;
  avgResponseTime: number;
  topPlanets: Record<string, number>;
  recentRequests: RequestLog[];
  suspiciousIPs: Set<string>;
  alerts: string[];
}

class AnalyticsService {
  private metrics: Metrics = {
    totalRequests: 0,
    errors: 0,
    errorRate: 0,
    avgResponseTime: 0,
    topPlanets: {},
    recentRequests: [],
    suspiciousIPs: new Set(),
    alerts: []
  };

  private readonly MAX_RECENT = 100;
  private readonly ALERT_THRESHOLD_ERRORS = 5; // 5 помилок за хвилину
  private readonly ALERT_THRESHOLD_REQUESTS = 50; // 50 запитів за 10 секунд з одного IP

  // Додаємо лог запиту
  logRequest(log: RequestLog): void {
    // Додаємо до загальної статистики
    this.metrics.totalRequests++;
    
    // Рахуємо помилки
    if (log.statusCode >= 400) {
      this.metrics.errors++;
    }

    // Рахуємо відвідування планет
    if (log.planetId) {
      this.metrics.topPlanets[log.planetId] = (this.metrics.topPlanets[log.planetId] || 0) + 1;
    }

    // Зберігаємо останні запити
    this.metrics.recentRequests.push(log);
    if (this.metrics.recentRequests.length > this.MAX_RECENT) {
      this.metrics.recentRequests.shift();
    }

    // Оновлюємо середній час відповіді
    const totalDuration = this.metrics.recentRequests.reduce((sum, r) => sum + r.duration, 0);
    this.metrics.avgResponseTime = totalDuration / this.metrics.recentRequests.length;

    // Оновлюємо відсоток помилок
    this.metrics.errorRate = (this.metrics.errors / this.metrics.totalRequests) * 100;

    // Перевіряємо аномалії
    this.detectAnomalies(log);
  }

  // Детекція аномалій
  private detectAnomalies(log: RequestLog): void {
    const alerts: string[] = [];

    // 1. Підозрілі User-Agent (боти, скрапери)
    const suspiciousAgents = ['bot', 'crawler', 'scraper', 'curl', 'wget', 'python', 'java'];
    const userAgentLower = log.userAgent.toLowerCase();
    if (suspiciousAgents.some(agent => userAgentLower.includes(agent))) {
      alerts.push(`🤖 Підозрілий User-Agent: ${log.userAgent} (IP: ${log.ip})`);
    }

    // 2. Часті запити з одного IP (перевіряємо за останні 10 секунд)
    const now = Date.now();
    const requestsFromIP = this.metrics.recentRequests.filter(
      r => r.ip === log.ip && (now - new Date(r.timestamp).getTime() < 10000)
    );
    if (requestsFromIP.length > this.ALERT_THRESHOLD_REQUESTS) {
      alerts.push(`🚨 Забагато запитів з IP ${log.ip}: ${requestsFromIP.length} за 10 секунд`);
      this.metrics.suspiciousIPs.add(log.ip);
    }

    // 3. Багато помилок поспіль
    const recentErrors = this.metrics.recentRequests
      .filter(r => r.statusCode >= 400)
      .slice(-5);
    if (recentErrors.length >= this.ALERT_THRESHOLD_ERRORS) {
      alerts.push(`🔥 5 помилок поспіль! Остання: ${log.method} ${log.url} → ${log.statusCode}`);
    }

    // 4. Неіснуючі планети
    if (log.statusCode === 404 && log.url.includes('/api/planets/')) {
      const planetId = log.url.split('/').pop();
      alerts.push(`❓ Спроба відвідати неіснуючу планету: "${planetId}" (IP: ${log.ip})`);
    }

    // Зберігаємо алерти
    if (alerts.length > 0) {
      this.metrics.alerts.push(...alerts);
      // Логуємо алерти в окремий файл (опціонально)
      alerts.forEach(alert => {
        console.log(`\x1b[31m🔴 ALERT: ${alert}\x1b[0m`);
      });
    }
  }

  // Отримати поточну статистику
  getMetrics(): Metrics {
    return {
      ...this.metrics,
      // Повертаємо копію, щоб не змінювати ззовні
      topPlanets: { ...this.metrics.topPlanets },
      recentRequests: [...this.metrics.recentRequests],
      suspiciousIPs: new Set(this.metrics.suspiciousIPs),
      alerts: [...this.metrics.alerts]
    };
  }

  // Очистити алерти (після перегляду)
  clearAlerts(): void {
    this.metrics.alerts = [];
  }
}

export const analytics = new AnalyticsService();