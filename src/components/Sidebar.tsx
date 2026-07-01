import { NavLink } from 'react-router-dom'
import { useUIStore } from '../store/uiStore'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded px-4 py-3 text-sm',
    isActive
      ? 'bg-violet-500 font-semibold text-white'
      : 'text-neutral-100 hover:bg-neutral-800',
  ].join(' ')

function Sidebar() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const closeSidebar = useUIStore((s) => s.closeSidebar)

  return (
    <>
      {/* Backdrop — only on mobile, only when the drawer is open */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 w-60 shrink-0 bg-black text-neutral-100',
          'transform transition-transform duration-150 ease-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          // On desktop the sidebar is always docked. 
          'md:static md:translate-x-0',
        ].join(' ')}
      >
        <div className="px-4 py-5 text-lg font-bold text-violet-400">
          Campuses &amp; Students
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {/* Tapping a link navigates and closes the drawer on mobile */}
          <NavLink to="/" end className={linkClass} onClick={closeSidebar}>
            Dashboard
          </NavLink>
          <NavLink to="/campuses" className={linkClass} onClick={closeSidebar}>
            Campuses
          </NavLink>
          <NavLink to="/students" className={linkClass} onClick={closeSidebar}>
            Students
          </NavLink>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
