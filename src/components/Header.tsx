import { useUIStore } from '../store/uiStore'

function Header() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const darkMode = useUIStore((s) => s.darkMode)
  const toggleDarkMode = useUIStore((s) => s.toggleDarkMode)

  return (
    <header className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 py-3 sm:px-6 dark:border-neutral-800 dark:bg-neutral-900">
      {/* Hamburger layout */}
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        className="rounded p-2 text-neutral-800 active:bg-neutral-200 md:hidden dark:text-neutral-100 dark:active:bg-neutral-700"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <h1 className="text-base font-semibold text-neutral-900 sm:text-lg dark:text-violet-400">
        NYC Student Manager
      </h1>

      {/* Dark-mode slider */}
      <button
        type="button"
        role="switch"
        aria-checked={darkMode}
        aria-label="Toggle dark mode"
        onClick={toggleDarkMode}
        className="ml-auto flex items-center gap-2"
      >
        <span className="hidden text-sm text-neutral-600 sm:inline dark:text-neutral-300">
          {darkMode ? 'Dark' : 'Light'}
        </span>
        <span
          className={[
            'relative h-6 w-11 rounded-full transition-colors',
            darkMode ? 'bg-violet-500' : 'bg-neutral-300',
          ].join(' ')}
        >
          <span
            className={[
              'absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] transition-transform',
              darkMode ? 'translate-x-5' : 'translate-x-0',
            ].join(' ')}
          >
            {darkMode ? '🌙' : '☀'} {/* dont touch the emojis bro*/}
          </span>
        </span>
      </button>
    </header>
  )
}

export default Header
