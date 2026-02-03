import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/todo', label: 'To Do' },
  { to: '/bundle-type', label: 'Bundle Type' },
  { to: '/categories', label: 'Categories' },
  { to: '/component', label: 'Component' },
  { to: '/skus', label: 'Sku Item', hasDropdown: true },
  { to: '/reports', label: 'Reports', hasDropdown: true },
]
const addUserTo = '/add-user'

export function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center justify-between bg-[#374151] px-4 text-[#f9fafb] shadow-md transition-shadow duration-300 ease-in-out md:h-14 md:px-6">
      {/* Hamburger: visible on small screens */}
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-[#f9fafb] transition-colors duration-200 ease-in-out hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
      >
        <span className="sr-only">Menu</span>
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop nav: hidden on mobile when closed */}
      <nav
        className={`absolute left-0 right-0 top-full flex flex-col gap-1 bg-[#374151] py-3 shadow-lg transition-all duration-300 ease-in-out md:static md:flex md:flex-row md:items-center md:gap-6 md:py-0 md:shadow-none ${
          menuOpen
            ? 'visible opacity-100 translate-y-0'
            : 'invisible opacity-0 -translate-y-2 md:visible md:opacity-100 md:translate-y-0'
        }`}
      >
        {navItems.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-white/10 md:px-0 md:py-0 md:hover:bg-transparent md:hover:opacity-90 ${isActive ? 'bg-white/10 md:bg-transparent md:underline' : ''}`
            }
            style={menuOpen ? { animationDelay: `${i * 30}ms` } : undefined}
          >
            {item.label}
            {item.hasDropdown && <span className="text-xs opacity-80">▼</span>}
          </NavLink>
        ))}
        <Link
          to={addUserTo}
          onClick={() => setMenuOpen(false)}
          className="mx-4 mt-2 rounded-lg bg-white px-3 py-2 text-center text-sm font-medium text-gray-800 transition-colors duration-200 ease-in-out hover:bg-gray-100 md:mx-0 md:mt-0 md:py-1.5"
        >
          Add User
        </Link>
      </nav>

      {/* User block: right side */}
      <div className="flex items-center gap-2 text-sm transition-opacity duration-200 ease-in-out md:gap-3">
        <span className="hidden text-gray-300 sm:inline">| Pagingzone |</span>
        <span className="truncate max-w-[120px] sm:max-w-none">Hello admin@industryis.com!</span>
        <button
          type="button"
          className="text-gray-300 transition-colors duration-200 ease-in-out hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Log off
        </button>
      </div>
    </header>
  )
}
