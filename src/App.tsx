import { useState, useCallback } from 'react'
import { Sidebar } from './components/Sidebar'
import { StudentDashboard } from './views/StudentDashboard'
import { CourseOverview } from './views/CourseOverview'
import { LessonPlayer } from './views/LessonPlayer'
import { KnowledgeMap } from './views/KnowledgeMap'
import { QuizView } from './views/QuizView'
import { InstructorDashboard } from './views/InstructorDashboard'
import { SearchView } from './views/SearchView'

export type View =
  | 'dashboard'
  | 'course'
  | 'module'
  | 'lesson'
  | 'map'
  | 'quiz'
  | 'quiz-results'
  | 'instructor'
  | 'search'

export type AppMode = 'student' | 'instructor'

export interface NavState {
  view: View
  moduleId?: string
  lessonId?: string
  quizScore?: number
  quizTotal?: number
  searchQuery?: string
}

export type Navigate = (state: NavState) => void

export default function App() {
  const [mode, setMode] = useState<AppMode>('student')
  const [navState, setNavState] = useState<NavState>({ view: 'dashboard' })
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigate = useCallback<Navigate>((state) => {
    setNavState(state)
  }, [])

  const { view, moduleId, lessonId, quizScore, quizTotal, searchQuery } = navState

  return (
    <div className="flex h-screen bg-[#070B14] text-[#F1F5F9] overflow-hidden">
      <Sidebar
        currentView={view}
        mode={mode}
        setMode={setMode}
        navigate={navigate}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main
        className="flex-1 overflow-y-auto"
        style={{ background: '#070B14' }}
      >
        {view === 'dashboard'    && <StudentDashboard navigate={navigate} mode={mode} />}
        {view === 'course'       && <CourseOverview  navigate={navigate} selectedModuleId={moduleId} />}
        {view === 'lesson'       && <LessonPlayer    navigate={navigate} moduleId={moduleId} lessonId={lessonId} />}
        {view === 'map'          && <KnowledgeMap    navigate={navigate} />}
        {view === 'quiz'         && <QuizView        navigate={navigate} />}
        {view === 'quiz-results' && <QuizResults     navigate={navigate} score={quizScore ?? 0} total={quizTotal ?? 5} />}
        {view === 'instructor'   && <InstructorDashboard navigate={navigate} />}
        {view === 'search'       && <SearchView      navigate={navigate} query={searchQuery ?? ''} />}
      </main>
    </div>
  )
}

/* ─── Inline QuizResults ────────────────────────────────── */
function QuizResults({ navigate, score, total }: { navigate: Navigate; score: number; total: number }) {
  const pct = Math.round((score / total) * 100)
  const passed = pct >= 80
  const circumference = 2 * Math.PI * 48

  return (
    <div className="min-h-screen dot-grid flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center anim-scale-in">
        {/* Ring */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="48" fill="none" stroke="#1E3052" strokeWidth="8" />
            <circle
              className="progress-ring-circle"
              cx="60" cy="60" r="48"
              fill="none"
              stroke={passed ? '#16A34A' : '#F97316'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * pct) / 100}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-bold">{pct}%</span>
            <span className="text-xs text-[#8B9BB4] uppercase tracking-widest">Score</span>
          </div>
        </div>

        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ background: passed ? 'rgba(22,163,74,0.15)' : 'rgba(239,68,68,0.15)', color: passed ? '#16A34A' : '#EF4444' }}
        >
          {passed ? '✓ Passed' : '✗ Needs Review'}
        </div>

        <h1 className="font-display text-4xl font-bold mb-2">
          {score} / {total} Correct
        </h1>
        <p className="text-[#8B9BB4] mb-8">
          {passed
            ? 'Excellent work. You have demonstrated strong understanding of this concept.'
            : 'Review the highlighted concepts and try again. Understanding these rules thoroughly is essential.'}
        </p>

        <div className="glass rounded-2xl p-6 text-left mb-8">
          <h3 className="font-display text-lg font-semibold text-[#F97316] mb-4 uppercase tracking-wider">Concept Mastery</h3>
          {[
            { label: 'Team Control',       pct: 100, art: 'Art. 14' },
            { label: 'Dribbling Rules',    pct: pct >= 60 ? 80 : 40, art: 'Art. 24' },
            { label: '3-Second Rule',      pct: pct >= 80 ? 75 : 30, art: 'Art. 26' },
            { label: 'Status of the Ball', pct: pct >= 80 ? 70 : 25, art: 'Art. 16' },
          ].map(c => (
            <div key={c.label} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#CBD5E1]">{c.label}</span>
                <span className="font-mono text-[#8B9BB4] text-xs">{c.art}</span>
              </div>
              <div className="h-1.5 bg-[#142038] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${c.pct}%`, background: c.pct >= 70 ? '#16A34A' : '#F97316' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate({ view: 'quiz' })}
            className="flex-1 py-3 rounded-xl border border-[#1E3052] text-[#8B9BB4] hover:border-[#F97316] hover:text-[#F97316] transition-all text-sm font-semibold"
          >
            Retry Quiz
          </button>
          <button
            onClick={() => navigate({ view: 'lesson', moduleId: 'm02', lessonId: 'l02-04' })}
            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all orange-glow-sm"
            style={{ background: '#F97316', color: '#fff' }}
          >
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  )
}
