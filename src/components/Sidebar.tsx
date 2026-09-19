import { type Navigate, type View, type AppMode } from '../App'

interface SidebarProps {
  currentView: View
  mode: AppMode
  setMode: (m: AppMode) => void
  navigate: Navigate
  open: boolean
  setOpen: (o: boolean) => void
}

const BallIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="9.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 1.5C11 1.5 7 5 7 11s4 9.5 4 9.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M11 1.5C11 1.5 15 5 15 11s-4 9.5-4 9.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1.5 11h19" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

interface NavItem {
  id: View
  label: string
  icon: React.ReactNode
  forMode?: AppMode
}

const studentItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="1.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="1.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1.5" y="10" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'course',
    label: 'My Course',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L2 5.5v7L9 16l7-3.5v-7L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 5.5L9 9l7-3.5M9 9v7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'map',
    label: 'Knowledge Map',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="3" cy="3" r="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="15" cy="3" r="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="3" cy="15" r="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="15" cy="15" r="2" stroke="currentColor" strokeWidth="1.3" />
        <line x1="5" y1="4.5" x2="7.2" y2="7.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="13" y1="4.5" x2="10.8" y2="7.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="5" y1="13.5" x2="7.2" y2="10.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="13" y1="13.5" x2="10.8" y2="10.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: 'quiz',
    label: 'Quiz Bank',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.5 7C6.5 5.9 7.3 5 8.7 5C10 5 10.8 5.8 10.8 7C10.8 7.8 10.4 8.3 9.7 8.9C9.1 9.4 9 9.8 9 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="12.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'search',
    label: 'Search',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 12l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

const instructorItems: NavItem[] = [
  {
    id: 'instructor',
    label: 'Instructor Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="1.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="1.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1.5" y="10" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'course',
    label: 'Course Builder',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 6v6M6 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'map',
    label: 'Knowledge Map',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="3" cy="3" r="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="15" cy="3" r="2" stroke="currentColor" strokeWidth="1.3" />
        <line x1="5" y1="4.5" x2="7.2" y2="7.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="13" y1="4.5" x2="10.8" y2="7.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: 'quiz',
    label: 'Quiz Bank',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.5 7C6.5 5.9 7.3 5 8.7 5C10 5 10.8 5.8 10.8 7C10.8 7.8 10.4 8.3 9.7 8.9C9.1 9.4 9 9.8 9 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="12.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
]

export function Sidebar({ currentView, mode, setMode, navigate, open }: SidebarProps) {
  const items = mode === 'student' ? studentItems : instructorItems

  return (
    <aside
      className="flex flex-col h-screen border-r border-[#1E3052] flex-shrink-0 transition-all duration-300"
      style={{ width: open ? '220px' : '64px', background: '#09101E' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1E3052]">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}
        >
          <BallIcon />
        </div>
        {open && (
          <div className="anim-fade-in">
            <div className="font-display text-base font-bold leading-tight tracking-wide text-white">
              REFLEARN
            </div>
            <div className="text-[10px] text-[#4B6080] tracking-widest font-mono uppercase">
              FIBA Grade 3
            </div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        {items.map(item => {
          const active = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => navigate({ view: item.id })}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-left transition-all duration-150 ${
                active
                  ? 'bg-[#0F1C30] text-white nav-active'
                  : 'text-[#5A7090] hover:bg-[#0D1525] hover:text-[#CBD5E1]'
              }`}
            >
              <span className={`flex-shrink-0 ${active ? 'text-[#F97316]' : ''}`}>
                {item.icon}
              </span>
              {open && (
                <span className="text-sm font-medium whitespace-nowrap anim-fade-in">
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Mode toggle */}
      <div className="border-t border-[#1E3052] p-3">
        {open ? (
          <div className="glass rounded-xl p-1 flex">
            <button
              onClick={() => { setMode('student'); navigate({ view: 'dashboard' }) }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === 'student' ? 'bg-[#F97316] text-white' : 'text-[#5A7090] hover:text-white'}`}
            >
              Student
            </button>
            <button
              onClick={() => { setMode('instructor'); navigate({ view: 'instructor' }) }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === 'instructor' ? 'bg-[#F97316] text-white' : 'text-[#5A7090] hover:text-white'}`}
            >
              Instructor
            </button>
          </div>
        ) : (
          <button
            onClick={() => setMode(mode === 'student' ? 'instructor' : 'student')}
            className="w-full flex items-center justify-center py-2 rounded-lg text-[#5A7090] hover:text-[#F97316] transition-colors"
            title="Toggle mode"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {open && (
          <div className="mt-3 flex items-center gap-2 px-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              A
            </div>
            <div className="anim-fade-in min-w-0">
              <div className="text-xs font-semibold text-[#CBD5E1] truncate">Ahmad Karimi</div>
              <div className="text-[10px] text-[#4B6080] capitalize">{mode}</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
