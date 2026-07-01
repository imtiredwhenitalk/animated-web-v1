export type LanguageCode = 'uk' | 'en' | 'pl' | 'de' | 'es'

type PlanetPageKey =
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto'
  | 'moon'

interface PlanetPageTranslation {
  intro: string
  description: string
  supplemental?: string
  primaryAction: string
  secondaryAction: string
}

interface PlanetExplorerTranslation {
  title: string
  subtitle: string
  comingSoon: string
  close: string
  controlsHint: string
  moonLabel: string
  planetDescriptions: Record<
    'Sun' | 'Mercury' | 'Venus' | 'Earth' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'Constellation' | 'Moon',
    string
  >
}

export interface Translation {
  settings: {
    back: string
    title: string
    subtitle: string
    saved: string
    language: string
    languageDesc: string
    theme: string
    themeDesc: string
    themeLight: string
    themeDark: string
    themeSystem: string
    units: string
    unitsDesc: string
    unitsMetric: string
    unitsImperial: string
    notifications: string
    notificationsDesc: string
    autoUpdates: string
    autoUpdatesDesc: string
    footer: string
  }
  planets: {
    ui: {
      planets: string
      constellation: string
      moveToAnotherPlanet: string
      openMenu: string
      closeMenu: string
      settings: string
      learnMore: string
      viewGallery: string
    }
    explorer: PlanetExplorerTranslation
    pages: Record<PlanetPageKey, PlanetPageTranslation>
  }
}

export const translations: Record<LanguageCode, Translation> = {
  uk: {
    settings: {
      back: 'Назад',
      title: 'Налаштування',
      subtitle: 'Керуй мовою, темою та іншими параметрами застосунку',
      saved: 'Збережено',
      language: 'Мова інтерфейсу',
      languageDesc: 'Мова, якою відображається весь контент застосунку',
      theme: 'Тема оформлення',
      themeDesc: 'Світла, темна або відповідно до системи',
      themeLight: 'Світла',
      themeDark: 'Темна',
      themeSystem: 'Системна',
      units: 'Одиниці виміру',
      unitsDesc: 'Температура, відстань та інші величини',
      unitsMetric: 'Метричні',
      unitsImperial: 'Імперські',
      notifications: 'Сповіщення',
      notificationsDesc: 'Push-сповіщення про оновлення та події',
      autoUpdates: 'Автоматичні оновлення',
      autoUpdatesDesc: 'Завантажувати оновлення застосунку у фоні',
      footer: 'Налаштування зберігаються локально у браузері',
    },
    planets: {
      ui: {
        planets: 'Планети',
        constellation: 'Сузір\'я',
        moveToAnotherPlanet: 'До іншої планети',
        openMenu: 'Відкрити головне меню',
        closeMenu: 'Закрити меню',
        settings: 'Налаштування',
        learnMore: 'Дізнатися більше',
        viewGallery: 'Переглянути галерею',
      },
      explorer: {
        title: 'Сонячна система',
        subtitle: '8 планет · Натисни, щоб дослідити',
        comingSoon: 'Незабаром',
        close: 'Закрити',
        controlsHint: 'Тягни, щоб обертати · Колесо для масштабу · Наведи на планету',
        moonLabel: 'Місяць',
        planetDescriptions: {
          Sun: 'Сонце — зоря в центрі Сонячної системи. Воно живить усе навколо.',
          Mercury: 'Меркурій — найменша й найближча до Сонця планета. Його кам’яниста поверхня вкрита кратерами.',
          Venus: 'Венера — друга планета від Сонця і найгарячіший світ у Сонячній системі.',
          Earth: 'Земля — третя планета від Сонця та єдиний відомий світ, де існує життя.',
          Mars: 'Марс — четверта планета від Сонця, холодний і пиловий кам’янистий світ.',
          Jupiter: 'Юпітер — найбільша планета. Його шторми та супутники домінують у зовнішній частині системи.',
          Saturn: 'Сатурн — друга за розміром планета, відома своїми яскравими кільцями.',
          Uranus: 'Уран — крижаний гігант, що обертається на боці і має тонкі кільця.',
          Neptune: 'Нептун — найвіддаленіша велика планета й найвітряніший світ системи.',
          Pluto: 'Плутон — карликова планета у зовнішній частині системи з крижаною поверхнею.',
          Constellation: 'Сузір’я будують карту неба та поєднують зорі у знайомі візерунки.',
          Moon: 'Місяць — природний супутник Землі. Він формує припливи й освітлює нічне небо.',
        },
      },
      pages: {
        sun: {
          intro: 'Ласкаво просимо до',
          description: 'Сонце — зоря в центрі Сонячної системи. Воно випромінює світло й тепло, завдяки яким існує життя на Землі.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        mercury: {
          intro: 'Ласкаво просимо до',
          description: 'Меркурій — найменша і найближча до Сонця планета. Його поверхня скеляста, суха й сильно вкрита кратерами.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        venus: {
          intro: 'Ласкаво просимо до',
          description: 'Венера — друга планета від Сонця і найгарячіший світ у системі. Її густі хмари утримують сильний парниковий ефект.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        earth: {
          intro: 'Ласкаво просимо до',
          description: 'Земля — третя планета від Сонця та єдиний відомий світ, де існує життя. Вода, атмосфера і клімат роблять її особливою.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        mars: {
          intro: 'Ласкаво просимо до',
          description: 'Марс — четверта планета від Сонця. Це холодний, сухий світ із пиловими бурями та червонуватою поверхнею.',
          supplemental: 'Саме Марс найчастіше асоціюють із колонізацією та пошуком слідів давнього життя. Його каньйони, вулкани й полярні шапки роблять планету однією з найцікавіших для дослідження.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        jupiter: {
          intro: 'Ласкаво просимо до',
          description: 'Юпітер — найбільша планета Сонячної системи. Його потужні шторми та велика кількість супутників роблять його унікальним.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        saturn: {
          intro: 'Ласкаво просимо до',
          description: 'Сатурн — друга за розміром планета, відома своїми яскравими кільцями та численними супутниками.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        uranus: {
          intro: 'Ласкаво просимо до',
          description: 'Уран — крижаний гігант, який обертається на боці. Його блакитний відтінок і тонкі кільця легко впізнати.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        neptune: {
          intro: 'Ласкаво просимо до',
          description: 'Нептун — найвіддаленіша велика планета і найвітряніший світ Сонячної системи. Його атмосфера славиться бурями.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        pluto: {
          intro: 'Ласкаво просимо до',
          description: 'Плутон — карликова планета у зовнішній частині системи. Його крижана поверхня зберігає сліди давньої історії.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
        moon: {
          intro: 'Ласкаво просимо до',
          description: 'Місяць — природний супутник Землі. Він керує припливами, світить уночі та завжди повернутий до нас однією стороною.',
          supplemental: 'Без Місяця орбіта Землі, припливи та багато ритмів природи виглядали б інакше. Його поверхня зберігає сліди древніх ударів і є своєрідним архівом ранньої історії Сонячної системи.',
          primaryAction: 'Дізнатися більше',
          secondaryAction: 'Переглянути галерею',
        },
      },
    },
  },
  en: {
    settings: {
      back: 'Back',
      title: 'Settings',
      subtitle: 'Manage language, theme, and other app preferences',
      saved: 'Saved',
      language: 'Interface language',
      languageDesc: 'The language used across the entire app',
      theme: 'Appearance',
      themeDesc: 'Light, dark, or follow your system',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeSystem: 'System',
      units: 'Units',
      unitsDesc: 'Temperature, distance, and other measurements',
      unitsMetric: 'Metric',
      unitsImperial: 'Imperial',
      notifications: 'Notifications',
      notificationsDesc: 'Push notifications about updates and events',
      autoUpdates: 'Automatic updates',
      autoUpdatesDesc: 'Download app updates in the background',
      footer: 'Settings are stored locally in your browser',
    },
    planets: {
      ui: {
        planets: 'Planets',
        constellation: 'Constellation',
        moveToAnotherPlanet: 'Move to another planet',
        openMenu: 'Open main menu',
        closeMenu: 'Close menu',
        settings: 'Settings',
        learnMore: 'Learn more',
        viewGallery: 'View gallery',
      },
      explorer: {
        title: 'Solar System',
        subtitle: '8 planets · Click to explore',
        comingSoon: 'Coming soon',
        close: 'Close',
        controlsHint: 'Drag to rotate · Scroll to zoom · Hover a planet',
        moonLabel: 'Moon',
        planetDescriptions: {
          Sun: 'The Sun is the star at the center of the Solar System. It powers everything around it.',
          Mercury: 'Mercury is the smallest and innermost planet. Its rocky surface is heavily cratered.',
          Venus: 'Venus is the second planet from the Sun and the hottest world in the Solar System.',
          Earth: 'Earth is the third planet from the Sun and the only known world with life.',
          Mars: 'Mars is the fourth planet from the Sun and a cold, dusty terrestrial world.',
          Jupiter: 'Jupiter is the largest planet. Its storms and moons dominate the outer Solar System.',
          Saturn: 'Saturn is the second-largest planet and is famous for its bright rings.',
          Uranus: 'Uranus is an ice giant that rotates on its side and has faint rings.',
          Neptune: 'Neptune is the farthest major planet and the windiest world in the Solar System.',
          Pluto: 'Pluto is a dwarf planet in the outer Solar System with a frozen, icy surface.',
          Constellation: 'Constellations map the sky and connect stars into familiar patterns.',
          Moon: 'The Moon is Earth\'s natural satellite. It shapes the tides and lights the night sky.',
        },
      },
      pages: {
        sun: { intro: 'Welcome to the', description: 'The Sun is the star at the center of the Solar System. It is a source of light, heat, and gravity for everything nearby.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        mercury: { intro: 'Welcome to the', description: 'Mercury is the smallest and innermost planet. Its rocky surface is dry and heavily cratered.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        venus: { intro: 'Welcome to the', description: 'Venus is the second planet from the Sun and the hottest world in the Solar System. Its thick clouds trap intense heat.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        earth: { intro: 'Welcome to the', description: 'Earth is the third planet from the Sun and the only known world with life. Oceans, air, and climate make it unique.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        mars: { intro: 'Welcome to the', description: 'Mars is the fourth planet from the Sun. It is a cold, dry world with dust storms and a reddish surface.', supplemental: 'Mars is often linked to future exploration because it keeps clues about ancient water, changing climates, and the possibility of past life. Its valleys, volcanoes, and ice caps make it a rich target for missions.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        jupiter: { intro: 'Welcome to the', description: 'Jupiter is the largest planet in the Solar System. Its powerful storms and many moons make it stand out.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        saturn: { intro: 'Welcome to the', description: 'Saturn is the second-largest planet and is famous for its bright rings and many moons.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        uranus: { intro: 'Welcome to the', description: 'Uranus is an ice giant that rotates on its side. Its blue color and faint rings are easy to spot.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        neptune: { intro: 'Welcome to the', description: 'Neptune is the farthest major planet and the windiest world in the Solar System. Its atmosphere is famous for storms.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        pluto: { intro: 'Welcome to the', description: 'Pluto is a dwarf planet in the outer Solar System. Its frozen surface preserves traces of a long history.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
        moon: { intro: 'Welcome to the', description: 'The Moon is Earth\'s natural satellite. It drives the tides, lights the night sky, and always shows the same face to us.', supplemental: 'Without the Moon, Earth\'s tides, orbital stability, and many cycles of nature would look very different. Its scarred surface preserves ancient impacts and acts like a record of the early Solar System.', primaryAction: 'Learn more', secondaryAction: 'View gallery' },
      },
    },
  },
  pl: {
    settings: {
      back: 'Wstecz',
      title: 'Ustawienia',
      subtitle: 'Zarządzaj językiem, motywem i innymi preferencjami',
      saved: 'Zapisano',
      language: 'Język interfejsu',
      languageDesc: 'Język używany w całej aplikacji',
      theme: 'Wygląd',
      themeDesc: 'Jasny, ciemny lub zgodny z systemem',
      themeLight: 'Jasny',
      themeDark: 'Ciemny',
      themeSystem: 'Systemowy',
      units: 'Jednostki miary',
      unitsDesc: 'Temperatura, odległość i inne wartości',
      unitsMetric: 'Metryczne',
      unitsImperial: 'Imperialne',
      notifications: 'Powiadomienia',
      notificationsDesc: 'Powiadomienia push o aktualizacjach i wydarzeniach',
      autoUpdates: 'Automatyczne aktualizacje',
      autoUpdatesDesc: 'Pobieraj aktualizacje aplikacji w tle',
      footer: 'Ustawienia są zapisywane lokalnie w przeglądarce',
    },
    planets: {
      ui: {
        planets: 'Planety',
        constellation: 'Gwiazdozbiór',
        moveToAnotherPlanet: 'Przejdź do innej planety',
        openMenu: 'Otwórz menu główne',
        closeMenu: 'Zamknij menu',
        settings: 'Ustawienia',
        learnMore: 'Dowiedz się więcej',
        viewGallery: 'Zobacz galerię',
      },
      explorer: {
        title: 'Układ Słoneczny',
        subtitle: '8 planet · Kliknij, aby odkrywać',
        comingSoon: 'Wkrótce',
        close: 'Zamknij',
        controlsHint: 'Przeciągnij, aby obracać · Przewiń, aby przybliżyć · Najedź na planetę',
        moonLabel: 'Księżyc',
        planetDescriptions: {
          Sun: 'Słońce to gwiazda w centrum Układu Słonecznego. Zasila wszystko wokół.',
          Mercury: 'Merkury to najmniejsza i najbliższa Słońcu planeta. Jego skalista powierzchnia jest pełna kraterów.',
          Venus: 'Wenus to druga planeta od Słońca i najgorętszy świat w Układzie Słonecznym.',
          Earth: 'Ziemia to trzecia planeta od Słońca i jedyny znany świat z życiem.',
          Mars: 'Mars to czwarta planeta od Słońca i zimny, pylisty świat skalisty.',
          Jupiter: 'Jowisz to największa planeta. Jego burze i księżyce dominują w zewnętrznej części Układu.',
          Saturn: 'Saturn to druga co do wielkości planeta, słynąca z jasnych pierścieni.',
          Uranus: 'Uran to lodowy olbrzym, który obraca się na boku i ma delikatne pierścienie.',
          Neptune: 'Neptun to najdalsza duża planeta i najbardziej wietrzny świat Układu Słonecznego.',
          Pluto: 'Pluton to planeta karłowata na obrzeżach Układu Słonecznego z lodową powierzchnią.',
          Constellation: 'Gwiazdozbiory porządkują niebo i łączą gwiazdy w znajome wzory.',
          Moon: 'Księżyc jest naturalnym satelitą Ziemi. Kształtuje pływy i rozświetla nocne niebo.',
        },
      },
      pages: {
        sun: { intro: 'Witamy na', description: 'Słońce to gwiazda w centrum Układu Słonecznego. Daje światło, ciepło i grawitację wszystkiemu wokół.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        mercury: { intro: 'Witamy na', description: 'Merkury to najmniejsza i najbliższa Słońcu planeta. Jego skalista powierzchnia jest sucha i pełna kraterów.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        venus: { intro: 'Witamy na', description: 'Wenus to druga planeta od Słońca i najgorętszy świat w Układzie Słonecznym. Gęste chmury zatrzymują tam ogromne ciepło.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        earth: { intro: 'Witamy na', description: 'Ziemia to trzecia planeta od Słońca i jedyny znany świat z życiem. Oceany, powietrze i klimat czynią ją wyjątkową.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        mars: { intro: 'Witamy na', description: 'Mars to czwarta planeta od Słońca. To zimny, suchy świat z burzami pyłowymi i czerwonawą powierzchnią.', supplemental: 'Mars często pojawia się w rozmowach o przyszłej eksploracji, bo zachowuje ślady dawnej wody, zmian klimatu i możliwego życia w przeszłości. Jego doliny, wulkany i czapy polarne czynią go wyjątkowo interesującym celem misji.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        jupiter: { intro: 'Witamy na', description: 'Jowisz to największa planeta Układu Słonecznego. Jego potężne burze i liczne księżyce robią wrażenie.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        saturn: { intro: 'Witamy na', description: 'Saturn to druga co do wielkości planeta, znana z jasnych pierścieni i wielu księżyców.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        uranus: { intro: 'Witamy na', description: 'Uran to lodowy olbrzym obracający się na boku. Jego niebieski kolor i delikatne pierścienie łatwo rozpoznać.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        neptune: { intro: 'Witamy na', description: 'Neptun to najdalsza duża planeta i najbardziej wietrzny świat Układu Słonecznego. Jego atmosfera słynie z burz.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        pluto: { intro: 'Witamy na', description: 'Pluton to planeta karłowata na obrzeżach Układu Słonecznego. Jego zamarznięta powierzchnia zachowuje ślady długiej historii.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
        moon: { intro: 'Witamy na', description: 'Księżyc jest naturalnym satelitą Ziemi. Steruje pływami, oświetla nocne niebo i zawsze pokazuje nam tę samą stronę.', supplemental: 'Bez Księżyca pływy, stabilność orbity Ziemi i wiele rytmów natury wyglądałyby inaczej. Jego blizny po uderzeniach są zapisem wczesnej historii Układu Słonecznego.', primaryAction: 'Dowiedz się więcej', secondaryAction: 'Zobacz galerię' },
      },
    },
  },
  de: {
    settings: {
      back: 'Zurück',
      title: 'Einstellungen',
      subtitle: 'Sprache, Design und weitere Optionen verwalten',
      saved: 'Gespeichert',
      language: 'Oberflächensprache',
      languageDesc: 'Die Sprache, in der die gesamte App angezeigt wird',
      theme: 'Erscheinungsbild',
      themeDesc: 'Hell, dunkel oder systemabhängig',
      themeLight: 'Hell',
      themeDark: 'Dunkel',
      themeSystem: 'System',
      units: 'Maßeinheiten',
      unitsDesc: 'Temperatur, Entfernung und weitere Werte',
      unitsMetric: 'Metrisch',
      unitsImperial: 'Imperial',
      notifications: 'Benachrichtigungen',
      notificationsDesc: 'Push-Benachrichtigungen zu Updates und Ereignissen',
      autoUpdates: 'Automatische Updates',
      autoUpdatesDesc: 'App-Updates im Hintergrund herunterladen',
      footer: 'Einstellungen werden lokal im Browser gespeichert',
    },
    planets: {
      ui: {
        planets: 'Planeten',
        constellation: 'Sternbild',
        moveToAnotherPlanet: 'Zu einem anderen Planeten wechseln',
        openMenu: 'Hauptmenü öffnen',
        closeMenu: 'Menü schließen',
        settings: 'Einstellungen',
        learnMore: 'Mehr erfahren',
        viewGallery: 'Galerie ansehen',
      },
      explorer: {
        title: 'Sonnensystem',
        subtitle: '8 Planeten · Klicke zum Erkunden',
        comingSoon: 'Demnächst',
        close: 'Schließen',
        controlsHint: 'Ziehen zum Drehen · Scrollen zum Zoomen · Planet anhovern',
        moonLabel: 'Mond',
        planetDescriptions: {
          Sun: 'Die Sonne ist der Stern im Zentrum des Sonnensystems. Sie versorgt alles um sie herum mit Energie.',
          Mercury: 'Merkur ist der kleinste und sonnennächste Planet. Seine felsige Oberfläche ist stark verkratert.',
          Venus: 'Venus ist der zweite Planet von der Sonne und die heißeste Welt im Sonnensystem.',
          Earth: 'Die Erde ist der dritte Planet von der Sonne und die einzige bekannte Welt mit Leben.',
          Mars: 'Der Mars ist der vierte Planet von der Sonne und eine kalte, staubige Gesteinswelt.',
          Jupiter: 'Jupiter ist der größte Planet. Seine Stürme und Monde prägen den äußeren Teil des Sonnensystems.',
          Saturn: 'Saturn ist der zweitgrößte Planet und berühmt für seine hellen Ringe.',
          Uranus: 'Uranus ist ein Eisriese, der seitlich rotiert und dünne Ringe besitzt.',
          Neptune: 'Neptun ist der fernste große Planet und die windigste Welt des Sonnensystems.',
          Pluto: 'Pluto ist ein Zwergplanet am Rand des Sonnensystems mit einer eisigen Oberfläche.',
          Constellation: 'Sternbilder ordnen den Himmel und verbinden Sterne zu vertrauten Mustern.',
          Moon: 'Der Mond ist der natürliche Satellit der Erde. Er beeinflusst die Gezeiten und erhellt die Nacht.',
        },
      },
      pages: {
        sun: { intro: 'Willkommen bei', description: 'Die Sonne ist der Stern im Zentrum des Sonnensystems. Sie liefert Licht, Wärme und Gravitation für alles in ihrer Nähe.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        mercury: { intro: 'Willkommen bei', description: 'Merkur ist der kleinste und sonnennächste Planet. Seine felsige Oberfläche ist trocken und stark verkratert.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        venus: { intro: 'Willkommen bei', description: 'Venus ist der zweite Planet von der Sonne und die heißeste Welt im Sonnensystem. Dichte Wolken speichern extreme Hitze.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        earth: { intro: 'Willkommen bei', description: 'Die Erde ist der dritte Planet von der Sonne und die einzige bekannte Welt mit Leben. Ozeane, Luft und Klima machen sie einzigartig.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        mars: { intro: 'Willkommen bei', description: 'Der Mars ist der vierte Planet von der Sonne. Es ist eine kalte, trockene Welt mit Staubstürmen und rötlicher Oberfläche.', supplemental: 'Der Mars wird oft mit zukünftiger Erforschung verbunden, weil er Hinweise auf uraltes Wasser, wechselnde Klimata und mögliches früheres Leben trägt. Täler, Vulkane und Polkappen machen ihn besonders spannend.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        jupiter: { intro: 'Willkommen bei', description: 'Jupiter ist der größte Planet des Sonnensystems. Seine gewaltigen Stürme und vielen Monde machen ihn besonders.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        saturn: { intro: 'Willkommen bei', description: 'Saturn ist der zweitgrößte Planet und berühmt für seine hellen Ringe und zahlreichen Monde.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        uranus: { intro: 'Willkommen bei', description: 'Uranus ist ein Eisriese, der seitlich rotiert. Seine blaue Farbe und die dünnen Ringe sind leicht zu erkennen.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        neptune: { intro: 'Willkommen bei', description: 'Neptun ist der fernste große Planet und die windigste Welt des Sonnensystems. Seine Atmosphäre ist für Stürme bekannt.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        pluto: { intro: 'Willkommen bei', description: 'Pluto ist ein Zwergplanet am Rand des Sonnensystems. Seine gefrorene Oberfläche bewahrt Spuren einer langen Geschichte.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
        moon: { intro: 'Willkommen bei', description: 'Der Mond ist der natürliche Satellit der Erde. Er steuert die Gezeiten, erhellt die Nacht und zeigt uns immer dieselbe Seite.', supplemental: 'Ohne den Mond sähen die Gezeiten, die Bahnstabilität der Erde und viele Zyklen der Natur anders aus. Seine Krateroberfläche bewahrt Spuren früher Einschläge und dokumentiert das junge Sonnensystem.', primaryAction: 'Mehr erfahren', secondaryAction: 'Galerie ansehen' },
      },
    },
  },
  es: {
    settings: {
      back: 'Atrás',
      title: 'Ajustes',
      subtitle: 'Gestiona el idioma, el tema y otras preferencias',
      saved: 'Guardado',
      language: 'Idioma de la interfaz',
      languageDesc: 'El idioma utilizado en toda la aplicación',
      theme: 'Apariencia',
      themeDesc: 'Claro, oscuro o según el sistema',
      themeLight: 'Claro',
      themeDark: 'Oscuro',
      themeSystem: 'Sistema',
      units: 'Unidades',
      unitsDesc: 'Temperatura, distancia y otras medidas',
      unitsMetric: 'Métrico',
      unitsImperial: 'Imperial',
      notifications: 'Notificaciones',
      notificationsDesc: 'Notificaciones push sobre actualizaciones y eventos',
      autoUpdates: 'Actualizaciones automáticas',
      autoUpdatesDesc: 'Descargar actualizaciones de la app en segundo plano',
      footer: 'Los ajustes se guardan localmente en tu navegador',
    },
    planets: {
      ui: {
        planets: 'Planetas',
        constellation: 'Constelación',
        moveToAnotherPlanet: 'Ir a otro planeta',
        openMenu: 'Abrir menú principal',
        closeMenu: 'Cerrar menú',
        settings: 'Ajustes',
        learnMore: 'Saber más',
        viewGallery: 'Ver galería',
      },
      explorer: {
        title: 'Sistema Solar',
        subtitle: '8 planetas · Haz clic para explorar',
        comingSoon: 'Próximamente',
        close: 'Cerrar',
        controlsHint: 'Arrastra para girar · Desplaza para acercar · Pasa el cursor por un planeta',
        moonLabel: 'Luna',
        planetDescriptions: {
          Sun: 'El Sol es la estrella en el centro del Sistema Solar. Alimenta todo lo que lo rodea.',
          Mercury: 'Mercurio es el planeta más pequeño y el más cercano al Sol. Su superficie rocosa está llena de cráteres.',
          Venus: 'Venus es el segundo planeta desde el Sol y el mundo más caliente del Sistema Solar.',
          Earth: 'La Tierra es el tercer planeta desde el Sol y el único mundo conocido con vida.',
          Mars: 'Marte es el cuarto planeta desde el Sol y un mundo rocoso, frío y polvoriento.',
          Jupiter: 'Júpiter es el planeta más grande. Sus tormentas y lunas dominan la parte exterior del sistema.',
          Saturn: 'Saturno es el segundo planeta más grande y es famoso por sus brillantes anillos.',
          Uranus: 'Urano es un gigante de hielo que gira de lado y tiene anillos tenues.',
          Neptune: 'Neptuno es el planeta grande más lejano y el mundo más ventoso del Sistema Solar.',
          Pluto: 'Plutón es un planeta enano en la zona exterior del Sistema Solar con una superficie helada.',
          Constellation: 'Las constelaciones ordenan el cielo y conectan estrellas en patrones familiares.',
          Moon: 'La Luna es el satélite natural de la Tierra. Marca las mareas e ilumina la noche.',
        },
      },
      pages: {
        sun: { intro: 'Bienvenido a', description: 'El Sol es la estrella en el centro del Sistema Solar. Proporciona luz, calor y gravedad a todo lo cercano.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        mercury: { intro: 'Bienvenido a', description: 'Mercurio es el planeta más pequeño y el más cercano al Sol. Su superficie rocosa es seca y muy llena de cráteres.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        venus: { intro: 'Bienvenido a', description: 'Venus es el segundo planeta desde el Sol y el mundo más caliente del Sistema Solar. Sus nubes densas retienen un calor extremo.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        earth: { intro: 'Bienvenido a', description: 'La Tierra es el tercer planeta desde el Sol y el único mundo conocido con vida. Océanos, aire y clima la hacen única.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        mars: { intro: 'Bienvenido a', description: 'Marte es el cuarto planeta desde el Sol. Es un mundo frío y seco con tormentas de polvo y una superficie rojiza.', supplemental: 'Marte suele asociarse con futuras exploraciones porque conserva pistas sobre agua antigua, climas cambiantes y la posibilidad de vida pasada. Sus valles, volcanes y casquetes polares lo convierten en un destino especialmente interesante.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        jupiter: { intro: 'Bienvenido a', description: 'Júpiter es el planeta más grande del Sistema Solar. Sus poderosas tormentas y numerosas lunas lo hacen destacar.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        saturn: { intro: 'Bienvenido a', description: 'Saturno es el segundo planeta más grande y es famoso por sus brillantes anillos y muchas lunas.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        uranus: { intro: 'Bienvenido a', description: 'Urano es un gigante de hielo que gira de lado. Su color azul y sus anillos tenues son fáciles de reconocer.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        neptune: { intro: 'Bienvenido a', description: 'Neptuno es el planeta grande más lejano y el mundo más ventoso del Sistema Solar. Su atmósfera es famosa por sus tormentas.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        pluto: { intro: 'Bienvenido a', description: 'Plutón es un planeta enano en la zona exterior del Sistema Solar. Su superficie congelada conserva huellas de una larga historia.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
        moon: { intro: 'Bienvenido a', description: 'La Luna es el satélite natural de la Tierra. Controla las mareas, ilumina la noche y siempre nos muestra la misma cara.', supplemental: 'Sin la Luna, las mareas, la estabilidad orbital de la Tierra y muchos ritmos naturales serían muy diferentes. Su superficie llena de cráteres conserva impactos antiguos y registra la historia temprana del Sistema Solar.', primaryAction: 'Saber más', secondaryAction: 'Ver galería' },
      },
    },
  },
}