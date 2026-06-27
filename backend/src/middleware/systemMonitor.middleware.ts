// src/middleware/systemMonitor.middleware.ts

import { analytics } from '../services/analytics.service';

// Запускаємо моніторинг кожні 30 секунд
export const startSystemMonitor = (): void => {
  setInterval(() => {
    const metrics = analytics.getMetrics();

    // Якщо є алерти - показуємо їх окремо
    if (metrics.alerts.length > 0) {
      console.log('\x1b[31m' + '='.repeat(60) + '\x1b[0m');
      console.log('\x1b[31m🚨 АКТИВНІ АЛЕРТИ:\x1b[0m');
      metrics.alerts.forEach(alert => console.log(`  ${alert}`));
      console.log('\x1b[31m' + '='.repeat(60) + '\x1b[0m');
    }

    // Статистика системи
    console.log('\x1b[36m' + '📊 СТАТИСТИКА СИСТЕМИ:' + '\x1b[0m');
    console.log(`  Загалом запитів: ${metrics.totalRequests}`);
    console.log(`  Помилок: ${metrics.errors} (${metrics.errorRate.toFixed(2)}%)`);
    console.log(`  Середній час: ${metrics.avgResponseTime.toFixed(2)}ms`);
    
    // Топ планети
    const sortedPlanets = Object.entries(metrics.topPlanets)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    if (sortedPlanets.length > 0) {
      console.log(`  🌍 Популярні планети:`);
      sortedPlanets.forEach(([name, count]) => {
        console.log(`    ${name}: ${count} відвідувань`);
      });
    }

    // Підозрілі IP
    if (metrics.suspiciousIPs.size > 0) {
      console.log(`  ⚠️ Підозрілі IP: ${[...metrics.suspiciousIPs].join(', ')}`);
    }

    console.log('─'.repeat(40));
  }, 30000); // кожні 30 секунд
};