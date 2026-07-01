import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../components/Languagecontext'

const navigation = [
  { name: 'Planets', element: <Link to="/planets" /> },
  { name: 'Constellation', element: <Link to="/constellation" /> },
  { name: 'Mars', element: <Link to="/mars" /> },
  { name: 'Move to another planet', element: <Link to="/jupiter" /> },
]

export default function Mars() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()
  const copy = t.planets.pages.mars

  const navLabel = (name: string) => {
    if (name === 'Planets') return t.planets.ui.planets
    if (name === 'Constellation') return t.planets.ui.constellation
    if (name === 'Move to another planet') return t.planets.ui.moveToAnotherPlanet
    return name
  }

  return (
    <div className="bg-black min-h-screen">

      {/* Відео на фоні */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-90"
      >
        <source src="assets/mars.mp4" type="video/mp4" />
      </video>

      {/* Темний оверлей */}
      <div className="fixed inset-0 bg-black/40 z-[1]" />

      {/* Весь контент поверх відео */}
      <div className="relative z-10">

        <header className="absolute inset-x-0 top-0 z-50">
          <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">

            {/* Логотип */}
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Mars</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=400"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Бургер на мобільному */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Навігація на десктопі */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.element.props.to}
                  className="text-sm/6 font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  {navLabel(item.name)}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                to="/settings"
                className="text-sm/6 font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                {t.settings.title} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

          </nav>

          {/* Мобільне меню */}
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Mars</span>
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=400"
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-white"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-white/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.element.props.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/10"
                      >
                        {navLabel(item.name)}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      to="/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/10"
                    >
                      {t.settings.title}
                    </Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        {/* Hero секція — текст СПРАВА */}
        <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center justify-end">
          <div className="max-w-xl lg:max-w-2xl lg:mr-24 py-32 sm:py-48 lg:py-56">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl leading-tight">
              {copy.intro}{' '}
              <span className="text-red-400">Mars</span>
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl/8">
              {copy.description}
            </p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
              {copy.supplemental}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/planets"
                className="rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-red-600 transition-colors"
              >
                {copy.primaryAction}
              </Link>
              <Link
                to="/constellation"
                className="text-sm/6 font-semibold text-white hover:text-red-300 transition-colors"
              >
                {copy.secondaryAction}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}