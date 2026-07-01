import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  sidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
  toggleSidebar: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

// Client-only UI state (Using zustand)
// Tracks the mobile sidebar drawer + the dark-mode preference.
// darkMode is persisted to localStorage so it survives refreshes.
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      openSidebar: () => set({ sidebarOpen: true }),
      closeSidebar: () => set({ sidebarOpen: false }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'ui-store',
      // Only remember the theme choice, not the transient sidebar state.
      partialize: (state) => ({ darkMode: state.darkMode }),
    },
  ),
)
