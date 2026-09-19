import { modules } from '../data'
import type { Navigate, AppMode } from '../App'

interface Props {
  navigate: Navigate
  mode: AppMode
}

function ProgressRing({ pct, size = 56, stroke = 5, color = '#F97316' }: { pct: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke * 2) / 2
  const circumference = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#142038" strokeWidth={stroke} />
      <circle
        className="progress-ring-circle"
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (circumference * pct) / 100}
      />
    </svg>
  )
}

export function StudentDashboard({ navigate }: Props) {
  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0)
  const completedLessons = modules.reduce((a, m) => a + m.lessons.filter(l => l.status === 'completed').length, 0)
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)

  const inProgressModule = modules.find(m => m.status === 'in-progress')
  const inProgressLesson = inProgressModule?.lessons.find(l => l.status === 'in-progress')

  const recentModules = modules.slice(0, 5)

  return (
    <div className="min-h-screen dot-grid p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8 anim-fade-up">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[#5A7090] text-sm mb-1 font-mono uppercase tracking-widest">Welcome back</p>
            <h1 className="font-display text-4xl font-bold text-white tracking-wide">Ahmad Karimi</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] pulse-orange" style={{ boxShadow: '0 0 0 0 rgba(22,163,74,0.4)' }} />
              <span className="text-xs text-[#8B9BB4]">FIBA Grade 3 Course</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-5">
        {/* Continue Learning — hero card */}
        <div className="col-span-12 lg:col-span-8 anim-fade-up anim-d1">
          <div
            className="relative rounded-2xl overflow-hidden border border-[#1E3052] cursor-pointer card-hover"
            style={{ background: 'linear-gradient(135deg, #0F1C30 0%, #0A1525 100%)', minHeight: '200px' }}
            onClick={() => navigate({ view: 'lesson', moduleId: 'm02', lessonId: 'l02-03' })}
          >
            {/* Court arc decoration */}
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-10"
              style={{
                background: 'radial-gradient(circle at 100% 0%, #F97316 0%, transparent 60%)',
              }}
            />
            <div
              className="absolute bottom-0 right-12 w-40 h-40 rounded-full border-2 opacity-[0.07]"
              style={{ borderColor: '#F97316' }}
            />
            <div
              className="absolute bottom-0 right-12 w-24 h-24 rounded-full border opacity-[0.05]"
              style={{ borderColor: '#F97316' }}
            />

            <div className="relative p-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-widest"
                      style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}
                    >
                      Continue Learning
                    </span>
                    <span className="text-[#5A7090] text-xs font-mono">65% complete</span>
                  </div>

                  <p className="text-[#5A7090] text-xs font-mono uppercase tracking-widest mb-1">
                    MODULE 02 · LESSON 03
                  </p>
                  <h2 className="font-display text-5xl font-bold text-white tracking-wide mb-3 leading-none">
                    TEAM CONTROL
                  </h2>
                  <p className="text-[#8B9BB4] text-sm leading-relaxed max-w-md">
                    Understanding when a team controls the ball — the foundation for time violations,
                    shot clock, and status of the ball.
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    <button
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all orange-glow"
                      style={{ background: '#F97316', color: '#fff' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <polygon points="2,1 12,7 2,13" />
                      </svg>
                      Resume Lesson
                    </button>
                    <div className="flex items-center gap-1.5 text-[#5A7090] text-sm">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M7 4.5V7l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      20 min remaining
                    </div>
                  </div>
                </div>

                {/* Progress ring */}
                <div className="hidden lg:flex flex-col items-center gap-2">
                  <div className="relative">
                    <ProgressRing pct={65} size={88} stroke={7} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl font-bold">65%</span>
                    </div>
                  </div>
                  <span className="text-[#5A7090] text-xs">Module progress</span>
                </div>
              </div>
            </div>

            {/* Progress bar at bottom */}
            <div className="h-1 bg-[#142038]">
              <div className="h-full rounded-full" style={{ width: '65%', background: '#F97316' }} />
            </div>
          </div>
        </div>

        {/* Stats column */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 anim-fade-up anim-d2">
          <StatCard value={`${overallProgress}%`} label="Overall Progress" sublabel={`${completedLessons}/${totalLessons} lessons`} color="#F97316" />
          <StatCard value="2/10" label="Modules Complete" sublabel="8 remaining" color="#2563EB" />
          <StatCard value="72%" label="Quiz Accuracy" sublabel="Last 5 quizzes" color="#16A34A" />
          <StatCard value="14" label="Concepts Mastered" sublabel="of 42 total" color="#8B5CF6" />
        </div>

        {/* Module progress */}
        <div className="col-span-12 lg:col-span-8 anim-fade-up anim-d3">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider">Course Progress</h2>
              <button
                onClick={() => navigate({ view: 'course' })}
                className="text-xs text-[#F97316] hover:text-[#FB923C] font-semibold transition-colors uppercase tracking-wider"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {recentModules.map((mod, i) => (
                <div
                  key={mod.id}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all anim-fade-up ${
                    mod.status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0D1525]'
                  }`}
                  style={{ animationDelay: `${0.3 + i * 0.06}s` }}
                  onClick={() => mod.status !== 'locked' && navigate({ view: 'course', moduleId: mod.id })}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono"
                    style={{ background: `${mod.color}20`, color: mod.color }}
                  >
                    {String(mod.number).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-[#CBD5E1] truncate">{mod.title}</span>
                      <span className="text-xs font-mono text-[#5A7090] ml-2 flex-shrink-0">
                        {mod.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#142038] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${mod.progress}%`, background: mod.color }}
                      />
                    </div>
                  </div>
                  <StatusBadge status={mod.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended */}
        <div className="col-span-12 lg:col-span-4 anim-fade-up anim-d4">
          <div className="glass rounded-2xl p-6 h-full">
            <h2 className="font-display text-xl font-bold uppercase tracking-wider mb-5">Up Next</h2>

            <div className="space-y-3">
              <RecommendedItem
                title="Team Control"
                meta="MODULE 02 · LESSON 03"
                duration="20 min"
                type="lesson"
                onClick={() => navigate({ view: 'lesson', moduleId: 'm02', lessonId: 'l02-03' })}
                active
              />
              <RecommendedItem
                title="Live Ball vs Dead Ball"
                meta="MODULE 03 · LESSON 01"
                duration="16 min"
                type="lesson"
                onClick={() => navigate({ view: 'lesson', moduleId: 'm03', lessonId: 'l03-01' })}
              />
              <RecommendedItem
                title="Module 02 Quiz"
                meta="5 questions · Mixed"
                duration="10 min"
                type="quiz"
                onClick={() => navigate({ view: 'quiz' })}
              />
            </div>

            <div className="mt-5 pt-5 border-t border-[#142038]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#5A7090] uppercase tracking-wider font-mono">Today's Goal</span>
                <span className="text-[#F97316] font-semibold">2/3 lessons</span>
              </div>
              <div className="h-2 bg-[#142038] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '66%', background: 'linear-gradient(90deg, #F97316, #FB923C)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent quiz performance */}
        <div className="col-span-12 anim-fade-up anim-d5">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider">Recent Quiz Performance</h2>
              <button
                onClick={() => navigate({ view: 'quiz' })}
                className="text-xs text-[#F97316] hover:text-[#FB923C] font-semibold transition-colors uppercase tracking-wider"
              >
                Take Quiz →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: 'Team Control', score: 5, total: 5, art: 'Art. 14' },
                { label: 'Player Control', score: 4, total: 5, art: 'Art. 15' },
                { label: 'Players & Teams', score: 5, total: 5, art: 'Art. 4–6' },
                { label: 'Court & Equipment', score: 5, total: 5, art: 'Art. 2' },
                { label: 'Dribbling', score: 3, total: 5, art: 'Art. 24' },
              ].map(q => {
                const pct = (q.score / q.total) * 100
                return (
                  <div key={q.label} className="bg-[#0A1525] rounded-xl p-4 text-center border border-[#142038]">
                    <div className="relative inline-flex mb-2">
                      <ProgressRing pct={pct} size={48} stroke={4} color={pct === 100 ? '#16A34A' : pct >= 80 ? '#F97316' : '#EF4444'} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-sm font-bold">{q.score}/{q.total}</span>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#CBD5E1] leading-tight mb-1">{q.label}</div>
                    <div className="font-mono text-[10px] text-[#4B6080]">{q.art}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ value, label, sublabel, color }: { value: string; label: string; sublabel: string; color: string }) {
  return (
    <div className="glass rounded-xl p-4 border border-[#1E3052]">
      <div className="font-display text-3xl font-bold mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-sm font-semibold text-[#CBD5E1] leading-tight">{label}</div>
      <div className="text-xs text-[#5A7090] mt-0.5">{sublabel}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'completed') return (
    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider flex-shrink-0" style={{ background: 'rgba(22,163,74,0.1)', color: '#16A34A' }}>Done</span>
  )
  if (status === 'in-progress') return (
    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider flex-shrink-0" style={{ background: 'rgba(249,115,22,0.1)', color: '#F97316' }}>Active</span>
  )
  if (status === 'available') return (
    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider flex-shrink-0" style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB' }}>Ready</span>
  )
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider flex-shrink-0" style={{ background: 'rgba(91,112,128,0.1)', color: '#5A7090' }}>Locked</span>
  )
}

function RecommendedItem({
  title, meta, duration, type, onClick, active,
}: {
  title: string; meta: string; duration: string; type: 'lesson' | 'quiz'; onClick: () => void; active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
        active ? 'bg-[#0F1C30] border border-[rgba(249,115,22,0.25)]' : 'hover:bg-[#0D1525] border border-transparent'
      }`}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: type === 'quiz' ? 'rgba(139,92,246,0.15)' : 'rgba(249,115,22,0.15)', color: type === 'quiz' ? '#8B5CF6' : '#F97316' }}
      >
        {type === 'quiz'
          ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 5.5C5.5 4.7 6.1 4 7 4s1.5.6 1.5 1.5c0 .7-.4 1.1-.9 1.5C7.1 7.4 7 7.7 7 8.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><circle cx="7" cy="10" r="0.6" fill="currentColor" /></svg>
          : <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><polygon points="1,0.5 11,6 1,11.5" /></svg>
        }
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#CBD5E1] truncate">{title}</div>
        <div className="text-[10px] text-[#5A7090] font-mono uppercase tracking-wide">{meta}</div>
      </div>
      <div className="text-[10px] text-[#5A7090] flex-shrink-0">{duration}</div>
      {active && <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0" />}
    </button>
  )
}
