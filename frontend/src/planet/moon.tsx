import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Навігація тепер коректна — використовуємо to для react-router
const navigation = [
  { name: 'Planets', to: '/planets' },
  { name: 'Constellation', to: '/constellation' },
  { name: 'Moon', to: '/moon' },
  { name: 'Move to another planet', to: '/earth' },
];

export default function Moon() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // Додав overflow-hidden, щоб відео-куля не створювала горизонтальний скрол
    <div className="bg-black min-h-screen overflow-hidden">

      {/* Темний фон */}
      <div className="fixed inset-0 bg-black z-0" />

      {/* Відео — місяць справа як куля, pointer-events-none щоб не блокувати кліки */}
      <div
        className="fixed z-[1] pointer-events-none"
        style={{
          right: '-5vw',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '-60px 0 120px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.8)',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            opacity: 0.9,
          }}
        >
          <source src="/assets/moon.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Весь контент поверх відео */}
      <div className="relative z-10">

        <header className="absolute inset-x-0 top-0 z-50">
          <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">

            {/* Логотип */}
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Earth</span>
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

            {/* Навігація десктоп — тепер використовує Link */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-sm/6 font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Settings десктоп */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                to="/settings"
                className="text-sm/6 font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                Settings <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

          </nav>

          {/* Мобільне меню */}
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Earth</span>
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
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)} // Закриваємо меню після кліку
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/10"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      to="/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/10"
                    >
                      Settings
                    </Link>
                  </div>
                </div>
              </div>

            </DialogPanel>
          </Dialog>
        </header>

        {/* Hero секція — текст зліва */}
        <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center">
          <div className="max-w-xl lg:max-w-2xl lg:ml-24 py-32 sm:py-48 lg:py-56">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl leading-tight">
              Welcome to the{' '}
              <span className="text-indigo-400">Moon</span>
            </h1>

            {/* Поетичний текст у стилі Cloud Fable 5 */}
            <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl/8 leading-relaxed">
              The Moon is Earth's silent companion, a pale wanderer in the night sky.
              It has no air to breathe, no water to drink — only dust and ancient scars
              from a time before memory. Yet it pulls the oceans into restless rhythms
              and keeps our world from swaying too far in its cosmic dance.
              Though cold and still, it has guided travelers, inspired poets,
              and cradled the footsteps of those who dared to visit.
              The Moon does not shine by its own light — it borrows from the Sun —
              but in its quiet way, it has always been a lantern for Earth.
            </p>

            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/learn-more"
                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition-colors"
              >
                Learn more
              </Link>
              <Link
                to="/gallery"
                className="text-sm/6 font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                View gallery
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}