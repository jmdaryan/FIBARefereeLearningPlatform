import { useState } from 'react'
import { modules, knowledgeNodes, knowledgeEdges } from '../data'
import type { Navigate } from '../App'

interface Props { navigate: Navigate }

type ITab = 'overview' | 'courses' | 'students' | 'map' | 'quiz'

const tabs: { id: ITab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses',  label: 'Course Builder' },
  { id: 'students', label: 'Students' },
  { id: 'map',      label: 'Knowledge Map' },
  { id: 'quiz',     label: 'Quiz Bank' },
]

const students = [
  { name: 'Ahmad Karimi',    progress: 65, quiz: 87, mastery: 14, status: 'active' },
  { name: 'Sara Hosseini',   progress: 42, quiz: 72, mastery: 9,  status: 'active' },
  { name: 'Reza Ahmadi',     progress: 89, quiz: 94, mastery: 21, status: 'active' },
  { name: 'Mona Sadeghi',    progress: 28, quiz: 61, mastery: 6,  status: 'behind' },
  { name: 'Ali Moradi',      progress: 71, quiz: 83, mastery: 17, status: 'active' },
  { name: 'Fatemeh Nazari',  progress: 15, quiz: 55, mastery: 3,  status: 'behind' },
  { name: 'Dariush Tehrani', progress: 95, quiz: 98, mastery: 26, status: 'ahead'  },
]

export function InstructorDashboard({ navigate }: Props) {
  const [tab, setTab] = useState<ITab>('overview')

  return (
    <div className="min-h-screen dot-grid">
      {/* Header */}
      <div className="border-b border-[#1E3052] bg-[#09101E]">
        <div className="px-8 pt-6 pb-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#4B6080] mb-1">Instructor Mode</div>
              <h1 className="font-display text-4xl font-bold text-white uppercase tracking-wider">Instructor Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate({ view: 'lesson', moduleId: 'm02', lessonId: 'l02-03' })}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1E3052] text-sm font-semibold text-[#8B9BB4] hover:border-[#F97316] hover:text-[#F97316] transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><polygon points="2,1.5 12,7 2,12.5" /></svg>
                Preview Lesson
              </button>
              <button
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: '#F97316', color: '#fff' }}
              >
                + New Module
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
                  tab === t.id
                    ? 'border-[#F97316] text-white'
                    : 'border-transparent text-[#5A7090] hover:text-[#CBD5E1]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8">
        {tab === 'overview' && <OverviewTab navigate={navigate} />}
        {tab === 'courses'  && <CoursesTab  navigate={navigate} />}
        {tab === 'students' && <StudentsTab />}
        {tab === 'map'      && <MapTab navigate={navigate} />}
        {tab === 'quiz'     && <QuizBankTab navigate={navigate} />}
      </div>
    </div>
  )
}

function OverviewTab({ navigate }: { navigate: Navigate }) {
  const stats = [
    { value: '1',   label: 'Active Course',    sub: 'FIBA Grade 3',    color: '#F97316' },
    { value: '7',   label: 'Students',         sub: '5 active',        color: '#2563EB' },
    { value: '10',  label: 'Modules',          sub: '2 complete',      color: '#16A34A' },
    { value: '36',  label: 'Lessons',          sub: '8 complete',      color: '#8B5CF6' },
    { value: '25',  label: 'Quiz Questions',   sub: 'Quiz bank',       color: '#EC4899' },
    { value: '22',  label: 'Knowledge Nodes',  sub: 'Mapped concepts', color: '#14B8A6' },
  ]

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 anim-fade-up">
        {stats.map(s => (
          <div key={s.label} className="glass rounded-xl p-4 border border-[#1E3052]">
            <div className="font-display text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-semibold text-[#CBD5E1]">{s.label}</div>
            <div className="text-[10px] text-[#4B6080]">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Class progress */}
        <div className="col-span-12 lg:col-span-8 anim-fade-up anim-d1">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-5">Student Progress Overview</h3>
            <div className="space-y-3">
              {students.map((s, i) => (
                <div key={s.name} className="flex items-center gap-4 anim-fade-up" style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                    {s.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="w-32 text-sm text-[#CBD5E1] truncate flex-shrink-0">{s.name}</div>
                  <div className="flex-1 h-2 bg-[#142038] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.progress}%`,
                        background: s.status === 'ahead' ? '#16A34A' : s.status === 'behind' ? '#EF4444' : '#F97316',
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[#8B9BB4] w-8 text-right">{s.progress}%</span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider w-14 text-center"
                    style={{
                      background: s.status === 'ahead' ? 'rgba(22,163,74,0.1)' : s.status === 'behind' ? 'rgba(239,68,68,0.1)' : 'rgba(249,115,22,0.1)',
                      color: s.status === 'ahead' ? '#16A34A' : s.status === 'behind' ? '#EF4444' : '#F97316',
                    }}
                  >
                    {s.status === 'ahead' ? 'Ahead' : s.status === 'behind' ? 'Behind' : 'On Track'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="col-span-12 lg:col-span-4 space-y-3 anim-fade-up anim-d2">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Preview Lesson', sub: 'Team Control', color: '#F97316', action: () => navigate({ view: 'lesson', moduleId: 'm02', lessonId: 'l02-03' }) },
                { label: 'View Knowledge Map', sub: 'Dependency graph', color: '#2563EB', action: () => navigate({ view: 'map' }) },
                { label: 'Run Class Quiz', sub: 'Module 02 Quiz', color: '#16A34A', action: () => navigate({ view: 'quiz' }) },
                { label: 'Add New Concept', sub: 'Course builder', color: '#8B5CF6', action: () => {} },
              ].map(a => (
                <button
                  key={a.label}
                  onClick={a.action}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-[#0D1525] transition-all border border-[#1E3052]"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.color }} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{a.label}</div>
                    <div className="text-[10px] text-[#5A7090]">{a.sub}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="#5A7090" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              ))}
            </div>
          </div>

          {/* Instructor notes */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-lg font-bold uppercase tracking-wider">Instructor Notes</h3>
              <button className="text-xs text-[#F97316] font-semibold">+ Add</button>
            </div>
            <div className="space-y-2">
              {[
                'Emphasize the difference between player control and team control during dribble',
                'Students often confuse when team control ends during a shot attempt',
                'Use the Blue #7 game situation for interactive discussion',
              ].map((note, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-[#0A1525]">
                  <div className="w-1 h-full min-h-[20px] rounded-full flex-shrink-0" style={{ background: '#F97316' }} />
                  <p className="text-xs text-[#8B9BB4] leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CoursesTab({ navigate }: { navigate: Navigate }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-2xl font-bold uppercase tracking-wider">Course Builder</h3>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl border border-[#1E3052] text-sm text-[#8B9BB4] hover:text-white font-semibold transition-all">Reorder</button>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: '#F97316', color: '#fff' }}>+ New Module</button>
        </div>
      </div>

      {modules.slice(0, 6).map((mod, i) => (
        <div
          key={mod.id}
          className="glass rounded-xl p-5 border border-[#1E3052] flex items-center gap-4 anim-fade-up"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {/* Drag handle */}
          <div className="text-[#2A3D55] cursor-grab flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="4" y="3" width="2" height="2" rx="1" />
              <rect x="10" y="3" width="2" height="2" rx="1" />
              <rect x="4" y="7" width="2" height="2" rx="1" />
              <rect x="10" y="7" width="2" height="2" rx="1" />
              <rect x="4" y="11" width="2" height="2" rx="1" />
              <rect x="10" y="11" width="2" height="2" rx="1" />
            </svg>
          </div>

          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold flex-shrink-0" style={{ background: `${mod.color}20`, color: mod.color }}>
            {String(mod.number).padStart(2, '0')}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold uppercase tracking-wide">{mod.title}</span>
              <span className="font-mono text-[10px] text-[#4B6080]">{mod.articles}</span>
            </div>
            <div className="text-xs text-[#5A7090]">{mod.lessons.length} lessons · {mod.subtitle}</div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider`} style={{
              background: mod.status === 'completed' ? 'rgba(22,163,74,0.1)' : mod.status === 'in-progress' ? 'rgba(249,115,22,0.1)' : mod.status === 'available' ? 'rgba(37,99,235,0.1)' : '#142038',
              color: mod.status === 'completed' ? '#16A34A' : mod.status === 'in-progress' ? '#F97316' : mod.status === 'available' ? '#2563EB' : '#5A7090',
            }}>
              {mod.status}
            </span>
            <button className="px-3 py-1.5 rounded-lg border border-[#1E3052] text-xs text-[#8B9BB4] hover:border-[#F97316] hover:text-[#F97316] transition-all font-semibold">
              Edit
            </button>
          </div>
        </div>
      ))}

      {/* Concept editor preview */}
      <div className="mt-6 glass rounded-2xl p-6">
        <h4 className="font-display text-xl font-bold uppercase tracking-wider mb-4 text-[#F97316]">Concept Editor — Team Control</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#5A7090] font-mono uppercase tracking-wider block mb-1">Concept Title</label>
            <div className="h-9 rounded-lg border border-[#1E3052] bg-[#0A1525] px-3 flex items-center text-sm text-white">Team Control</div>
          </div>
          <div>
            <label className="text-xs text-[#5A7090] font-mono uppercase tracking-wider block mb-1">Official Article</label>
            <div className="h-9 rounded-lg border border-[#1E3052] bg-[#0A1525] px-3 flex items-center text-sm text-white">Art. 14</div>
          </div>
          <div className="col-span-2">
            <label className="text-xs text-[#5A7090] font-mono uppercase tracking-wider block mb-1">Prerequisites</label>
            <div className="flex items-center gap-2 flex-wrap p-3 rounded-lg border border-[#1E3052] bg-[#0A1525]">
              {['Players', 'Teams', 'Player Control'].map(p => (
                <span key={p} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(22,163,74,0.1)', color: '#16A34A' }}>
                  ✓ {p} <button className="ml-1 hover:text-white">×</button>
                </span>
              ))}
              <button className="px-2 py-0.5 rounded-full text-xs border border-dashed border-[#1E3052] text-[#5A7090] hover:border-[#F97316] hover:text-[#F97316]">
                + Add prerequisite
              </button>
            </div>
          </div>
          <div className="col-span-2 flex justify-end gap-2">
            <button className="px-4 py-2 rounded-xl border border-[#1E3052] text-sm text-[#8B9BB4] font-semibold">Cancel</button>
            <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: '#F97316', color: '#fff' }}>Save Concept</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StudentsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-2xl font-bold uppercase tracking-wider">Students</h3>
        <div className="flex items-center gap-2">
          <div className="glass rounded-lg px-3 py-2 flex items-center gap-2 text-sm text-[#5A7090]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" /><path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
            Search students...
          </div>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: '#F97316', color: '#fff' }}>+ Invite</button>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E3052]">
              {['Student', 'Progress', 'Quiz Avg', 'Concepts Mastered', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-[10px] font-mono uppercase tracking-widest text-[#4B6080]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.name} className="border-b border-[#0D1525] hover:bg-[#0A1525] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center text-[10px] font-bold text-white">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-semibold text-white">{s.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-[#142038] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.progress}%`, background: '#F97316' }} />
                    </div>
                    <span className="text-xs font-mono text-[#8B9BB4]">{s.progress}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-mono" style={{ color: s.quiz >= 80 ? '#16A34A' : s.quiz >= 70 ? '#F97316' : '#EF4444' }}>
                    {s.quiz}%
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-[#CBD5E1]">{s.mastery} / 42</span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                    style={{
                      background: s.status === 'ahead' ? 'rgba(22,163,74,0.1)' : s.status === 'behind' ? 'rgba(239,68,68,0.1)' : 'rgba(249,115,22,0.1)',
                      color: s.status === 'ahead' ? '#16A34A' : s.status === 'behind' ? '#EF4444' : '#F97316',
                    }}
                  >
                    {s.status === 'ahead' ? 'Ahead' : s.status === 'behind' ? 'Needs Help' : 'On Track'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-xs text-[#F97316] hover:text-[#FB923C] font-semibold transition-colors">View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MapTab({ navigate }: { navigate: Navigate }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-2xl font-bold uppercase tracking-wider">Knowledge Map Editor</h3>
        <button
          onClick={() => navigate({ view: 'map' })}
          className="px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: '#F97316', color: '#fff' }}
        >
          Open Full Map
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 glass rounded-2xl overflow-hidden" style={{ height: '400px' }}>
          <div className="h-full flex items-center justify-center" style={{ background: '#050A14' }}>
            {/* Mini map preview */}
            <svg width="100%" height="100%" viewBox="0 0 700 350" preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker id="arrow-mini" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#1E3052" />
                </marker>
              </defs>
              {/* Sample mini nodes */}
              {knowledgeNodes.slice(0, 14).map(node => {
                const x = (node.x / 1100) * 660 + 20
                const y = (node.y / 850) * 330 + 10
                const colors: Record<string, string> = {
                  foundation: '#2563EB', control: '#16A34A', status: '#F97316',
                  violation: '#EF4444', foul: '#EC4899', procedure: '#8B5CF6', mechanics: '#14B8A6',
                }
                const c = colors[node.category] ?? '#5A7090'
                return (
                  <g key={node.id} transform={`translate(${x}, ${y})`}>
                    <circle r="18" fill={`${c}18`} stroke={c} strokeWidth="1.5" />
                    <text textAnchor="middle" y="5" fontSize="7" fill="#F1F5F9" fontFamily="'Barlow Condensed'" fontWeight="700">
                      {node.label.split('\n')[0]}
                    </text>
                  </g>
                )
              })}
              {knowledgeEdges.slice(0, 18).map((edge: { from: string; to: string }, i: number) => {
                const fn = knowledgeNodes.find(n => n.id === edge.from)
                const tn = knowledgeNodes.find(n => n.id === edge.to)
                if (!fn || !tn) return null
                const x1 = (fn.x / 1100) * 660 + 20
                const y1 = (fn.y / 850) * 330 + 10
                const x2 = (tn.x / 1100) * 660 + 20
                const y2 = (tn.y / 850) * 330 + 10
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(30,48,82,0.8)" strokeWidth="1" markerEnd="url(#arrow-mini)" />
              })}
            </svg>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-3">
          <div className="glass rounded-xl p-5">
            <h4 className="font-display text-lg font-bold uppercase tracking-wider mb-3">Map Stats</h4>
            <div className="space-y-2">
              {[
                { label: 'Total Concepts', value: '22' },
                { label: 'Dependencies', value: '28' },
                { label: 'Categories', value: '7' },
                { label: 'Mastered (class avg)', value: '32%' },
              ].map(s => (
                <div key={s.label} className="flex justify-between text-sm">
                  <span className="text-[#8B9BB4]">{s.label}</span>
                  <span className="font-mono font-semibold text-white">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h4 className="font-display text-lg font-bold uppercase tracking-wider mb-3">Weak Concepts</h4>
            <div className="space-y-2">
              {[
                { label: 'Unsportsmanlike Foul', pct: 30, color: '#EF4444' },
                { label: '3PO Rotation',         pct: 20, color: '#14B8A6' },
                { label: 'Shot Clock Resets',     pct: 35, color: '#F97316' },
                { label: 'Free Throw Procedure',  pct: 35, color: '#8B5CF6' },
              ].map(c => (
                <div key={c.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#CBD5E1]">{c.label}</span>
                    <span className="font-mono text-[#5A7090]">{c.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#142038] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuizBankTab({ navigate }: { navigate: Navigate }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-2xl font-bold uppercase tracking-wider">Quiz Bank</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate({ view: 'quiz' })}
            className="px-4 py-2 rounded-xl border border-[#1E3052] text-sm text-[#8B9BB4] hover:border-[#F97316] hover:text-[#F97316] font-semibold transition-all"
          >
            Preview Quiz
          </button>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: '#F97316', color: '#fff' }}>
            + New Question
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { q: 'When does Team Control begin?', type: 'multiple-choice', art: 'Art. 14', concept: 'Team Control', difficulty: 'Medium' },
          { q: 'Identify the double dribble violation in this scenario...', type: 'scenario', art: 'Art. 24', concept: 'Dribbling', difficulty: 'Hard' },
          { q: 'Team Control ends when the ball is released on a shot attempt. True or False?', type: 'true-false', art: 'Art. 14', concept: 'Team Control', difficulty: 'Easy' },
          { q: 'The 3-second count resets when a player receives a pass in the paint. True or False?', type: 'true-false', art: 'Art. 26', concept: '3-Second Rule', difficulty: 'Medium' },
          { q: 'After White team scores, what is the status of the ball during the Blue team throw-in?', type: 'scenario', art: 'Art. 16', concept: 'Status of Ball', difficulty: 'Hard' },
        ].map((q, i) => (
          <div
            key={i}
            className="glass rounded-xl p-5 flex items-center gap-4 border border-[#1E3052] anim-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0" style={{ background: '#142038', color: '#F97316' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{q.q}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-[10px] text-[#4B6080]">{q.art}</span>
                <span className="text-[#1E3052]">·</span>
                <span className="text-[10px] text-[#5A7090]">{q.concept}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{
                background: q.type === 'scenario' ? 'rgba(239,68,68,0.1)' : q.type === 'true-false' ? 'rgba(37,99,235,0.1)' : 'rgba(139,92,246,0.1)',
                color: q.type === 'scenario' ? '#EF4444' : q.type === 'true-false' ? '#2563EB' : '#8B5CF6',
              }}>
                {q.type === 'scenario' ? 'Scenario' : q.type === 'true-false' ? 'T/F' : 'MCQ'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{
                background: q.difficulty === 'Hard' ? 'rgba(239,68,68,0.1)' : q.difficulty === 'Easy' ? 'rgba(22,163,74,0.1)' : 'rgba(249,115,22,0.1)',
                color: q.difficulty === 'Hard' ? '#EF4444' : q.difficulty === 'Easy' ? '#16A34A' : '#F97316',
              }}>
                {q.difficulty}
              </span>
              <button className="text-xs text-[#5A7090] hover:text-[#F97316] transition-colors">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
