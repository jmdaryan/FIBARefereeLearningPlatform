import { useState } from 'react'
import { modules, type Module } from '../data'
import type { Navigate } from '../App'

interface Props {
  navigate: Navigate
  selectedModuleId?: string
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2.5" y="6" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function lessonStatusDot(status: string, color: string) {
  if (status === 'completed') return (
    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}22`, color }}>
      <CheckIcon size={10} />
    </div>
  )
  if (status === 'in-progress') return (
    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: color }}>
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
    </div>
  )
  if (status === 'available') return (
    <div className="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0" style={{ borderColor: color }}>
      <div className="w-1.5 h-1.5 rounded-full bg-[#1E3052]" />
    </div>
  )
  return (
    <div className="w-5 h-5 rounded-full border border-[#1E3052] flex items-center justify-center flex-shrink-0 text-[#2A3D55]">
      <LockIcon />
    </div>
  )
}

export function CourseOverview({ navigate, selectedModuleId }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(selectedModuleId ?? 'm02')

  const expanded = modules.find(m => m.id === expandedId)

  return (
    <div className="min-h-screen dot-grid">
      {/* Course Hero */}
      <div
        className="relative overflow-hidden border-b border-[#1E3052]"
        style={{ background: 'linear-gradient(135deg, #070B14 0%, #0A1525 60%, #0F1C30 100%)' }}
      >
        {/* Decorative court element */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice" opacity="0.04">
            <circle cx="400" cy="200" r="120" fill="none" stroke="#F97316" strokeWidth="2" />
            <circle cx="400" cy="200" r="60" fill="none" stroke="#F97316" strokeWidth="1.5" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="#F97316" strokeWidth="1.5" />
            <rect x="320" y="80" width="160" height="120" fill="none" stroke="#F97316" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="0" y2="200" stroke="#F97316" strokeWidth="2" />
            <line x1="800" y1="0" x2="800" y2="200" stroke="#F97316" strokeWidth="2" />
            <line x1="0" y1="0" x2="800" y2="0" stroke="#F97316" strokeWidth="2" />
          </svg>
          <div className="absolute right-0 top-0 w-80 h-full" style={{ background: 'radial-gradient(ellipse at 100% 50%, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />
        </div>

        <div className="relative px-8 py-10">
          <div className="flex items-center gap-2 mb-3 anim-fade-in">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#4B6080]">FIBA Grade 3</span>
            <span className="text-[#1E3052]">·</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#4B6080]">2024 Rules</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white tracking-wide mb-2 anim-fade-up">
            BASKETBALL REFEREE COURSE
          </h1>
          <p className="text-[#8B9BB4] text-base max-w-xl anim-fade-up anim-d1">
            A structured, dependency-aware learning path designed around how referees need to understand the rules — not the order they appear in the rulebook.
          </p>

          <div className="flex items-center gap-6 mt-6 anim-fade-up anim-d2">
            <div className="flex items-center gap-2 text-sm text-[#8B9BB4]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L2 5v6l6 3 6-3V5L8 2z" stroke="currentColor" strokeWidth="1.3" /><path d="M2 5l6 3 6-3M8 8v6" stroke="currentColor" strokeWidth="1.3" /></svg>
              10 Modules
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8B9BB4]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M5 8h6M5 5h6M5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
              36 Lessons
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8B9BB4]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" /><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
              ~12 hours
            </div>
            <div className="w-px h-4 bg-[#1E3052]" />
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-28 bg-[#142038] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '22%', background: '#F97316' }} />
              </div>
              <span className="text-xs text-[#F97316] font-semibold">22%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wider">Modules</h2>
          <div className="flex items-center gap-2 text-xs text-[#5A7090] font-mono uppercase tracking-wider">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#16A34A]" />Complete</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F97316]" />Active</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2563EB]" />Available</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#1E3052]" />Locked</span>
          </div>
        </div>

        <div className="space-y-2">
          {modules.map((mod, i) => (
            <ModuleRow
              key={mod.id}
              mod={mod}
              index={i}
              expanded={expandedId === mod.id}
              onToggle={() => setExpandedId(expandedId === mod.id ? null : mod.id)}
              onLessonClick={(lessonId) => navigate({ view: 'lesson', moduleId: mod.id, lessonId })}
            />
          ))}
        </div>

        {/* Final Assessment */}
        <div className="mt-4 glass rounded-2xl p-5 border border-dashed border-[#1E3052] flex items-center justify-between opacity-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#142038] flex items-center justify-center text-[#5A7090]">
              <LockIcon />
            </div>
            <div>
              <div className="font-display text-lg font-bold uppercase tracking-wider">Final Assessment</div>
              <div className="text-xs text-[#5A7090]">Complete all modules to unlock</div>
            </div>
          </div>
          <span className="text-xs text-[#5A7090] font-mono uppercase tracking-wider">Locked</span>
        </div>
      </div>
    </div>
  )
}

function ModuleRow({
  mod, index, expanded, onToggle, onLessonClick,
}: {
  mod: Module; index: number; expanded: boolean; onToggle: () => void; onLessonClick: (id: string) => void
}) {
  const isLocked = mod.status === 'locked'

  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all duration-200 anim-fade-up ${
        expanded ? 'border-[rgba(249,115,22,0.25)]' : 'border-[#1E3052]'
      } ${isLocked ? 'opacity-60' : ''}`}
      style={{ animationDelay: `${index * 0.05}s`, background: expanded ? '#0D1525' : '#090F1C' }}
    >
      {/* Module header */}
      <button
        className="w-full flex items-center gap-4 p-4 text-left"
        onClick={onToggle}
        disabled={isLocked}
      >
        {/* Number badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold transition-colors"
          style={{
            background: expanded ? `${mod.color}22` : '#142038',
            color: expanded ? mod.color : '#5A7090',
          }}
        >
          {String(mod.number).padStart(2, '0')}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-display text-lg font-bold uppercase tracking-wide text-white truncate">
              {mod.title}
            </span>
            <span className="font-mono text-[10px] text-[#4B6080] flex-shrink-0">{mod.articles}</span>
          </div>
          <div className="text-xs text-[#5A7090] truncate">{mod.subtitle}</div>
        </div>

        {/* Progress */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="text-xs font-mono text-[#8B9BB4]">
              {mod.lessons.filter(l => l.status === 'completed').length}/{mod.lessons.length}
            </div>
            <div className="text-[10px] text-[#4B6080] uppercase tracking-wider">lessons</div>
          </div>
          <div className="w-16 h-1.5 bg-[#142038] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${mod.progress}%`, background: mod.color }}
            />
          </div>
        </div>

        {/* Status badge */}
        <div className="flex-shrink-0">
          {mod.status === 'completed' && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(22,163,74,0.1)', color: '#16A34A' }}>
              <CheckIcon size={10} /> Complete
            </span>
          )}
          {mod.status === 'in-progress' && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(249,115,22,0.1)', color: '#F97316' }}>
              In Progress
            </span>
          )}
          {mod.status === 'available' && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB' }}>
              Start
            </span>
          )}
          {mod.status === 'locked' && (
            <span className="flex items-center gap-1 text-[#2A3D55]"><LockIcon /></span>
          )}
        </div>

        {/* Chevron */}
        <div className={`text-[#5A7090] transition-transform duration-200 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* Expanded lessons */}
      {expanded && (
        <div className="border-t border-[#142038] px-4 pb-4">
          <div className="pt-3 space-y-1">
            {mod.lessons.map((lesson, li) => {
              const isLessonLocked = lesson.status === 'locked'
              const isActive = lesson.status === 'in-progress'
              return (
                <button
                  key={lesson.id}
                  onClick={() => !isLessonLocked && onLessonClick(lesson.id)}
                  disabled={isLessonLocked}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    isLessonLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0F1C30] cursor-pointer'
                  } ${isActive ? 'bg-[#0F1C30] border border-[rgba(249,115,22,0.2)]' : ''}`}
                >
                  <div className="flex-shrink-0">{lessonStatusDot(lesson.status, mod.color)}</div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-[#CBD5E1]'}`}>
                      {lesson.title}
                    </div>
                    <div className="text-[10px] text-[#4B6080] font-mono uppercase tracking-wider mt-0.5">
                      Lesson {li + 1}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-[#5A7090]">{lesson.duration}</span>
                    {isActive && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}>
                        Continue
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
