import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Listbox, Switch, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  LanguageIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  BellIcon,
  GlobeAltIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { useLanguage } from './Languagecontext'
import type { LanguageCode } from './translation'

// ── Types ─────────────────────────────────────────────────────────

type Theme = 'light' | 'dark' | 'system'
type Units = 'metric' | 'imperial'

interface LanguageOption {
  code: LanguageCode
  label: string
  flag: string
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

// ── Local storage helpers (everything except language, which now
//    lives in LanguageContext / localStorage key "app-language") ──

const STORAGE_KEY = 'app-settings'

interface StoredSettings {
  theme: Theme
  units: Units
  notifications: boolean
  autoUpdates: boolean
}

const DEFAULT_SETTINGS: StoredSettings = {
  theme: 'system',
  units: 'metric',
  notifications: true,
  autoUpdates: true,
}

function loadSettings(): StoredSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function saveSettings(settings: StoredSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

// ── Reusable row wrapper ─────────────────────────────────────────

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof LanguageIcon
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-5">
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
          {description && (
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────

export default function Settings() {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()
  const [settings, setSettings] = useState<StoredSettings>(loadSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    saveSettings(settings)
    setSaved(true)
    const timer = setTimeout(() => setSaved(false), 1200)
    return () => clearTimeout(timer)
  }, [settings])

  const currentLanguage =
    LANGUAGE_OPTIONS.find((l) => l.code === language) ?? LANGUAGE_OPTIONS[0]

  const update = <K extends keyof StoredSettings>(key: K, value: StoredSettings[K]) =>
    setSettings((prev) => ({ ...prev, [key]: value }))

  const themeOptions: { value: Theme; label: string; icon: typeof SunIcon }[] = [
    { value: 'light', label: t.settings.themeLight, icon: SunIcon },
    { value: 'dark', label: t.settings.themeDark, icon: MoonIcon },
    { value: 'system', label: t.settings.themeSystem, icon: ComputerDesktopIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Sticky back-navigation bar — works on mobile (tap) and desktop (click / Esc) */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/70">
        <div className="mx-auto flex max-w-2xl items-center px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 -ml-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 active:scale-95 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>{t.settings.back}</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {t.settings.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t.settings.subtitle}
          </p>
        </div>
        <Transition
          show={saved}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            {t.settings.saved}
          </span>
        </Transition>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {/* Language */}
          <SettingRow
            icon={LanguageIcon}
            title={t.settings.language}
            description={t.settings.languageDesc}
          >
            <Listbox value={language} onChange={setLanguage}>
              <div className="relative w-48">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-left text-sm shadow-sm hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600">
                  <span className="flex items-center gap-2">
                    <span>{currentLanguage.flag}</span>
                    <span className="truncate text-gray-900 dark:text-gray-100">
                      {currentLanguage.label}
                    </span>
                  </span>
                  <ChevronUpDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </Listbox.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition duration-75 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 text-sm shadow-lg focus:outline-none dark:border-gray-700 dark:bg-gray-800">
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <Listbox.Option
                        key={lang.code}
                        value={lang.code}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                            active ? 'bg-indigo-50 dark:bg-indigo-500/10' : ''
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span
                                className={`truncate text-gray-900 dark:text-gray-100 ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {lang.label}
                              </span>
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-2.5 flex items-center text-indigo-600 dark:text-indigo-400">
                                <CheckIcon className="h-4 w-4" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </SettingRow>

          {/* Theme */}
          <SettingRow
            icon={SunIcon}
            title={t.settings.theme}
            description={t.settings.themeDesc}
          >
            <div className="flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update('theme', value)}
                  title={label}
                  className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                    settings.theme === value
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </SettingRow>

          {/* Units */}
          <SettingRow
            icon={GlobeAltIcon}
            title={t.settings.units}
            description={t.settings.unitsDesc}
          >
            <div className="flex rounded-lg border border-gray-200 p-1 text-sm dark:border-gray-700">
              {(['metric', 'imperial'] as Units[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => update('units', u)}
                  className={`rounded-md px-3 py-1.5 transition-colors ${
                    settings.units === u
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {u === 'metric' ? t.settings.unitsMetric : t.settings.unitsImperial}
                </button>
              ))}
            </div>
          </SettingRow>

          {/* Notifications */}
          <SettingRow
            icon={BellIcon}
            title={t.settings.notifications}
            description={t.settings.notificationsDesc}
          >
            <Switch
              checked={settings.notifications}
              onChange={(v) => update('notifications', v)}
              className={`${
                settings.notifications ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  settings.notifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </SettingRow>

          {/* Auto updates */}
          <SettingRow
            icon={ComputerDesktopIcon}
            title={t.settings.autoUpdates}
            description={t.settings.autoUpdatesDesc}
          >
            <Switch
              checked={settings.autoUpdates}
              onChange={(v) => update('autoUpdates', v)}
              className={`${
                settings.autoUpdates ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  settings.autoUpdates ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </SettingRow>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
        {t.settings.footer}
      </p>
      </div>
    </div>
  )
}