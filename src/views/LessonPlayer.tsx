import { useState, useEffect } from 'react'
import { teamControlSlides, type SlideData } from '../data'
import type { Navigate } from '../App'

interface Props {
  navigate: Navigate
  moduleId?: string
  lessonId?: string
}

export function LessonPlayer({ navigate }: Props) {
  const [slide, setSlide] = useState(0)
  const [animDir, setAnimDir] = useState<'right' | 'left'>('right')
  const [visible, setVisible] = useState(true)
  const [showOfficialPanel, setShowOfficialPanel] = useState(false)
  const [answered, setAnswered] = useState<number | null>(null)

  const slides = teamControlSlides
  const current = slides[slide]
  const total = slides.length

  const goTo = (dir: 'prev' | 'next') => {
    setAnimDir(dir === 'next' ? 'right' : 'left')
    setVisible(false)
    setAnswered(null)
    setTimeout(() => {
      setSlide(s => dir === 'next' ? Math.min(s + 1, total - 1) : Math.max(s - 1, 0))
      setVisible(true)
    }, 220)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo('next')
      if (e.key === 'ArrowLeft')  goTo('prev')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  return (
    <div className="h-screen flex flex-col bg-[#070B14]">
      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-[#1E3052] bg-[#09101E]">
        <div className="flex items-center gap-3 text-xs font-mono text-[#5A7090] uppercase tracking-wider">
          <button
            onClick={() => navigate({ view: 'course', moduleId: 'm02' })}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            Module 02
          </button>
          <span className="text-[#1E3052]">·</span>
          <span className="text-[#8B9BB4]">Team Control</span>
          <span className="text-[#1E3052]">·</span>
          <span style={{ color: '#F97316' }}>Lesson 3 of 4</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowOfficialPanel(!showOfficialPanel)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              showOfficialPanel
                ? 'bg-[rgba(249,115,22,0.15)] text-[#F97316] border border-[rgba(249,115,22,0.3)]'
                : 'border border-[#1E3052] text-[#5A7090] hover:text-white'
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M3 4h6M3 6h6M3 8h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>
            Official Reference
          </button>

          <span className="text-xs text-[#5A7090] font-mono">
            {slide + 1} / {total}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex-shrink-0 flex items-center justify-center gap-1.5 py-3 border-b border-[#0D1525]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setAnimDir(i > slide ? 'right' : 'left')
              setVisible(false)
              setAnswered(null)
              setTimeout(() => { setSlide(i); setVisible(true) }, 200)
            }}
            className={`rounded-full transition-all duration-300 ${
              i === slide
                ? 'w-6 h-2'
                : i < slide ? 'w-2 h-2' : 'w-2 h-2 opacity-30'
            }`}
            style={{
              background: i <= slide ? '#F97316' : '#1E3052',
            }}
          />
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.03) 0%, transparent 70%)' }}
          />

          <div
            className={`relative p-8 lg:p-12 transition-all duration-220 ${
              visible ? 'opacity-100 translate-x-0' : `opacity-0 ${animDir === 'right' ? '-translate-x-4' : 'translate-x-4'}`
            }`}
            style={{ transitionDuration: '220ms' }}
          >
            <SlideRenderer slide={current} answered={answered} setAnswered={setAnswered} onComplete={() => goTo('next')} />
          </div>
        </div>

        {/* Official Reference Panel */}
        {showOfficialPanel && (
          <div className="w-80 flex-shrink-0 border-l border-[#1E3052] overflow-y-auto bg-[#09101E] anim-slide-r">
            <div className="p-5">
              <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-4 text-[#F97316]">
                Official Reference
              </h3>

              <div className="space-y-4">
                <OfficialBlock
                  type="rule"
                  title="Art. 14 — Team Control"
                  text="A team is in control of the ball when a player of the team is in control of the ball (player control), or the ball is being passed between players of the same team, or the ball is at the disposal of a player of the team for a throw-in."
                  source="FIBA Official Basketball Rules 2024"
                />

                <OfficialBlock
                  type="interpretation"
                  title="Interpretation 14-1"
                  text="Team Control begins as soon as the ball is at the disposal of a player for a throw-in, even before the player actually touches the ball."
                  source="FIBA Official Interpretations 2024"
                />

                <div className="glass rounded-xl p-4 border border-[rgba(20,178,150,0.2)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(20,178,150,0.1)', color: '#14B8A6' }}>
                      IOT
                    </span>
                  </div>
                  <p className="text-xs text-[#8B9BB4] leading-relaxed">
                    Track Team Control to determine applicability of time violations. The Trail official has primary responsibility for 3-second and shot clock monitoring.
                  </p>
                </div>

                <div className="glass rounded-xl p-4 border border-[rgba(139,92,246,0.2)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>
                      3PO
                    </span>
                  </div>
                  <p className="text-xs text-[#8B9BB4] leading-relaxed">
                    Trail official monitors shot clock. Lead confirms possession changes. All officials must be aware of team control to properly administer time violations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-t border-[#1E3052] bg-[#09101E]">
        <button
          onClick={() => goTo('prev')}
          disabled={slide === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#1E3052] text-sm font-semibold text-[#8B9BB4] hover:border-[#2A4070] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          Previous
        </button>

        <div className="text-center">
          <div className="text-xs text-[#5A7090] font-mono uppercase tracking-wider">
            {current.type === 'intro' ? 'Introduction' :
             current.type === 'prerequisites' ? 'Prerequisites' :
             current.type === 'official' ? 'Official Rule' :
             current.type === 'diagram' ? 'Key Concepts' :
             current.type === 'scenario' ? 'On-Court Situation' :
             current.type === 'connection' ? 'Connections' :
             current.type === 'quiz' ? 'Knowledge Check' : 'Concept'}
          </div>
        </div>

        {slide < total - 1 ? (
          <button
            onClick={() => goTo('next')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#F97316', color: '#fff' }}
          >
            Next
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        ) : (
          <button
            onClick={() => navigate({ view: 'quiz' })}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all orange-glow"
            style={{ background: '#F97316', color: '#fff' }}
          >
            Take Quiz
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        )}
      </div>
    </div>
  )
}

function SlideRenderer({ slide, answered, setAnswered, onComplete }: {
  slide: SlideData; answered: number | null; setAnswered: (n: number) => void; onComplete: () => void
}) {
  switch (slide.type) {
    case 'intro':      return <IntroSlide slide={slide} />
    case 'prerequisites': return <PrereqSlide slide={slide} />
    case 'concept':    return <ConceptSlide slide={slide} />
    case 'official':   return <OfficialSlide slide={slide} />
    case 'diagram':    return <DiagramSlide slide={slide} />
    case 'scenario':   return <ScenarioSlide slide={slide} />
    case 'connection': return <ConnectionSlide slide={slide} />
    case 'quiz':       return <QuizSlide slide={slide} answered={answered} setAnswered={setAnswered} onComplete={onComplete} />
    default:           return <div>{slide.type}</div>
  }
}

function IntroSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="max-w-3xl mx-auto text-center py-8">
      <div className="flex items-center justify-center gap-2 mb-6 anim-fade-in">
        <span className="font-mono text-xs uppercase tracking-widest text-[#4B6080]">{slide.module}</span>
        <span className="text-[#1E3052]">·</span>
        <span className="font-mono text-xs uppercase tracking-widest text-[#4B6080]">{slide.lesson}</span>
      </div>

      <div className="relative mb-6 anim-fade-up anim-d1">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <svg width="400" height="200" viewBox="0 0 400 200">
            <circle cx="200" cy="100" r="95" fill="none" stroke="#F97316" strokeWidth="2" />
            <circle cx="200" cy="100" r="50" fill="none" stroke="#F97316" strokeWidth="1.5" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="#F97316" strokeWidth="1.5" />
          </svg>
        </div>
        <h1 className="font-display text-7xl lg:text-8xl font-black tracking-wider leading-none" style={{ color: '#F97316' }}>
          {slide.title}
        </h1>
      </div>

      <div className="flex items-center justify-center gap-3 mb-8 anim-fade-up anim-d2">
        <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border" style={{ borderColor: 'rgba(249,115,22,0.3)', color: '#F97316', background: 'rgba(249,115,22,0.08)' }}>
          {slide.article}
        </span>
        <span className="text-xs text-[#4B6080] font-mono">{slide.source}</span>
      </div>

      <div className="glass rounded-2xl p-6 text-left max-w-xl mx-auto anim-fade-up anim-d3">
        <h3 className="font-display text-sm font-bold uppercase tracking-widest text-[#F97316] mb-4">
          Learning Objectives
        </h3>
        <ul className="space-y-3">
          {slide.objectives.map((obj: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#CBD5E1]" style={{ animationDelay: `${0.4 + i * 0.07}s` }}>
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}>
                {i + 1}
              </span>
              {obj}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PrereqSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 anim-fade-up">
        <div className="font-mono text-xs uppercase tracking-widest text-[#4B6080] mb-2">Step 1 of 2 — Prerequisites</div>
        <h2 className="font-display text-5xl font-bold uppercase tracking-wide text-white mb-3">{slide.title}</h2>
        <p className="text-[#8B9BB4]">{slide.subtitle}</p>
      </div>

      <div className="space-y-3 mb-8">
        {slide.prerequisites.map((prereq: any, i: number) => (
          <div
            key={prereq.id}
            className="flex items-center gap-4 p-4 rounded-xl border anim-fade-up"
            style={{
              borderColor: prereq.status === 'completed' ? 'rgba(22,163,74,0.3)' : '#1E3052',
              background: prereq.status === 'completed' ? 'rgba(22,163,74,0.05)' : '#0A1525',
              animationDelay: `${0.1 + i * 0.1}s`,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: prereq.status === 'completed' ? 'rgba(22,163,74,0.15)' : '#142038',
                color: prereq.status === 'completed' ? '#16A34A' : '#5A7090',
              }}
            >
              {prereq.status === 'completed'
                ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4.5 4.5L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="5.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 5.5V4a3.5 3.5 0 017 0v1.5" stroke="currentColor" strokeWidth="1.3" /></svg>
              }
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">{prereq.label}</div>
              <div className="text-xs text-[#5A7090] font-mono">{prereq.article}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold" style={{ color: '#16A34A' }}>
                {prereq.mastery}% mastery
              </div>
              <div className="text-[10px] text-[#16A34A] uppercase tracking-wider">Complete</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-5 border anim-fade-up anim-d4"
        style={{ background: 'rgba(22,163,74,0.05)', borderColor: 'rgba(22,163,74,0.2)' }}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(22,163,74,0.15)', color: '#16A34A' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.5l-3.7 2.1.7-4.1-3-2.9 4.2-.6L8 1z" fill="currentColor" /></svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-[#16A34A] mb-1">{slide.message}</div>
            <div className="text-xs text-[#5A7090]">
              After this lesson, you will be ready to study: <span className="text-white font-semibold">{slide.nextConcept}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConceptSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8 anim-fade-up">
        <h2 className="font-display text-6xl font-bold uppercase tracking-wide text-white mb-4 leading-tight">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-[#5A7090] text-sm font-mono uppercase tracking-wider">{slide.subtitle}</p>
        )}
      </div>

      {slide.visual === 'team-control-diagram' && (
        <div className="mb-8 anim-fade-up anim-d1">
          <TeamControlFlowDiagram />
        </div>
      )}

      {slide.body && (
        <div className="glass rounded-2xl p-6 anim-fade-up anim-d2">
          <p className="text-lg text-[#CBD5E1] leading-relaxed">{slide.body}</p>
        </div>
      )}
    </div>
  )
}

function OfficialSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6 anim-fade-up">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(249,115,22,0.1)', color: '#F97316', border: '1px solid rgba(249,115,22,0.25)' }}>
            Official Rule
          </span>
          <span className="text-xs text-[#4B6080] font-mono">{slide.source}</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-white uppercase tracking-wider">{slide.article}</h2>
      </div>

      <div
        className="rounded-2xl p-8 mb-6 border-l-4 anim-fade-up anim-d1"
        style={{
          background: 'rgba(249,115,22,0.04)',
          borderLeftColor: '#F97316',
          borderTop: '1px solid rgba(249,115,22,0.15)',
          borderRight: '1px solid rgba(249,115,22,0.15)',
          borderBottom: '1px solid rgba(249,115,22,0.15)',
        }}
      >
        <div className="font-mono text-[11px] text-[#F97316] uppercase tracking-widest mb-4 opacity-70">Verbatim — FIBA Official Basketball Rules 2024</div>
        <div className="text-[#E2E8F0] leading-relaxed text-base whitespace-pre-line font-medium">
          {slide.text}
        </div>
      </div>

      {slide.note && (
        <div className="glass rounded-xl p-5 anim-fade-up anim-d2">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(37,99,235,0.15)', color: '#2563EB' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 1a1 1 0 110 2 1 1 0 010-2zM5 5h2v5H5z" /></svg>
            </div>
            <p className="text-sm text-[#8B9BB4] leading-relaxed">{slide.note}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function DiagramSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="font-display text-5xl font-bold uppercase tracking-wide text-white mb-8 anim-fade-up">
        {slide.title}
      </h2>
      <div className="space-y-3">
        {slide.items.map((item: any, i: number) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-xl glass border border-[#1E3052] anim-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-lg font-bold"
              style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
            >
              {item.icon === '⬤' ? (
                <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              )}
            </div>
            <div>
              <div className="font-semibold text-white mb-1">{item.label}</div>
              <div className="text-sm text-[#8B9BB4] leading-relaxed">{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScenarioSlide({ slide }: { slide: SlideData }) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6 anim-fade-up">
        <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest mb-4" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
          On-Court Situation
        </span>
        <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-white">{slide.title}</h2>
      </div>

      <div className="glass rounded-2xl p-6 mb-5 anim-fade-up anim-d1">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#5A7090] mb-3">Game Situation</div>
        <p className="text-[#CBD5E1] leading-relaxed text-base">{slide.situation}</p>
      </div>

      {/* Play sequence */}
      <div className="glass rounded-2xl p-6 mb-5 anim-fade-up anim-d2">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#5A7090] mb-4">Tracking Team Control</div>
        <div className="space-y-2">
          {slide.sequence.map((step: any, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{
                  background: step.control === 'BLUE' ? 'rgba(37,99,235,0.2)' : step.control === 'NONE' ? '#142038' : '#142038',
                  color: step.control === 'BLUE' ? '#60A5FA' : '#5A7090',
                }}
              >
                {i + 1}
              </div>
              <div className="flex-1 flex items-center gap-2 text-sm">
                <span className="text-[#CBD5E1]">{step.event}</span>
                <span className="text-[#2A3D55]">→</span>
                <span
                  className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{
                    background: step.control === 'BLUE' ? 'rgba(37,99,235,0.15)' : '#0F1C30',
                    color: step.control === 'BLUE' ? '#60A5FA' : '#5A7090',
                  }}
                >
                  {step.control} CONTROL
                </span>
              </div>
              <div className="text-xs text-[#4B6080] flex-shrink-0 hidden md:block">{step.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {!showAnswer ? (
        <button
          onClick={() => setShowAnswer(true)}
          className="w-full py-3 rounded-xl border border-[#1E3052] text-sm font-semibold text-[#8B9BB4] hover:border-[#F97316] hover:text-[#F97316] transition-all anim-fade-up anim-d3"
        >
          Show Official Answer
        </button>
      ) : (
        <div
          className="rounded-xl p-5 border anim-scale-in"
          style={{ background: 'rgba(22,163,74,0.05)', borderColor: 'rgba(22,163,74,0.25)' }}
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#16A34A] mb-2">Official Decision</div>
          <p className="text-[#CBD5E1] text-sm leading-relaxed">{slide.answer}</p>
          <div className="mt-3 font-mono text-[10px] text-[#16A34A]">{slide.rule}</div>
        </div>
      )}
    </div>
  )
}

function ConnectionSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-4 anim-fade-up">
        <h2 className="font-display text-5xl font-bold uppercase tracking-wide text-white mb-3">{slide.title}</h2>
        <p className="text-[#8B9BB4]">{slide.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {slide.connections.map((conn: any, i: number) => (
          <div
            key={i}
            className="glass rounded-xl p-4 border border-[#1E3052] anim-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.08}s` }}
          >
            <div className="text-sm font-bold text-white mb-1">{conn.label}</div>
            <div className="text-xs text-[#5A7090] mb-2">{conn.detail}</div>
            <div className="text-[10px] font-mono text-[#F97316]">Requires Team Control</div>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-5 border anim-fade-up anim-d4"
        style={{ background: 'rgba(249,115,22,0.05)', borderColor: 'rgba(249,115,22,0.2)' }}
      >
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#F97316] mb-2">Next Lesson</div>
        <p className="text-[#CBD5E1] text-sm">{slide.message}</p>
        <p className="text-white font-semibold mt-1">{slide.nextLesson}</p>
      </div>
    </div>
  )
}

function QuizSlide({ slide, answered, setAnswered, onComplete }: {
  slide: SlideData; answered: number | null; setAnswered: (n: number) => void; onComplete: () => void
}) {
  const isCorrect = answered === slide.correct

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6 anim-fade-up">
        <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest mb-4" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.2)' }}>
          Knowledge Check
        </span>
        <h2 className="font-display text-3xl font-bold text-white leading-tight">{slide.question}</h2>
      </div>

      <div className="space-y-2 mb-6">
        {slide.options.map((opt: string, i: number) => {
          const isSelected = answered === i
          const isRight = slide.correct === i
          let borderColor = '#1E3052'
          let bg = '#09101E'
          let textColor = '#CBD5E1'

          if (answered !== null) {
            if (isRight) { borderColor = '#16A34A'; bg = 'rgba(22,163,74,0.08)'; textColor = '#86EFAC' }
            else if (isSelected) { borderColor = '#EF4444'; bg = 'rgba(239,68,68,0.08)'; textColor = '#FCA5A5' }
            else { textColor = '#4B6080' }
          } else if (isSelected) {
            borderColor = '#F97316'
            bg = 'rgba(249,115,22,0.08)'
          }

          return (
            <button
              key={i}
              onClick={() => answered === null && setAnswered(i)}
              disabled={answered !== null}
              className="w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 anim-fade-up"
              style={{
                borderColor, background: bg,
                animationDelay: `${0.1 + i * 0.07}s`,
                cursor: answered !== null ? 'default' : 'pointer',
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: answered !== null && isRight ? 'rgba(22,163,74,0.2)' : answered !== null && isSelected ? 'rgba(239,68,68,0.2)' : '#142038',
                  color: answered !== null && isRight ? '#16A34A' : answered !== null && isSelected ? '#EF4444' : '#8B9BB4',
                }}
              >
                {answered !== null && isRight ? '✓' : answered !== null && isSelected ? '✗' : String.fromCharCode(65 + i)}
              </div>
              <span className="text-sm leading-relaxed" style={{ color: textColor }}>{opt}</span>
            </button>
          )
        })}
      </div>

      {answered !== null && (
        <div
          className="rounded-xl p-5 border anim-scale-in"
          style={{
            background: isCorrect ? 'rgba(22,163,74,0.05)' : 'rgba(239,68,68,0.05)',
            borderColor: isCorrect ? 'rgba(22,163,74,0.25)' : 'rgba(239,68,68,0.25)',
          }}
        >
          <div className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: isCorrect ? '#16A34A' : '#EF4444' }}>
            {isCorrect ? '✓ Correct' : '✗ Incorrect'} — {slide.article}
          </div>
          <p className="text-sm text-[#CBD5E1] leading-relaxed">{slide.explanation}</p>
        </div>
      )}
    </div>
  )
}

function OfficialBlock({ type, title, text, source }: { type: string; title: string; text: string; source: string }) {
  const colors: Record<string, string> = {
    rule: '#F97316', interpretation: '#2563EB', iot: '#14B8A6', threePO: '#8B5CF6',
  }
  const c = colors[type] ?? '#F97316'
  return (
    <div className="rounded-xl p-4 border" style={{ borderColor: `${c}30`, background: `${c}08` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider capitalize" style={{ background: `${c}15`, color: c }}>
          {type === 'rule' ? 'Official Rule' : type === 'interpretation' ? 'Interpretation' : type}
        </span>
      </div>
      <div className="text-xs font-semibold text-white mb-2">{title}</div>
      <p className="text-xs text-[#8B9BB4] leading-relaxed mb-2">{text}</p>
      <div className="font-mono text-[10px] text-[#4B6080]">{source}</div>
    </div>
  )
}

function TeamControlFlowDiagram() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1E3052] p-8" style={{ background: '#050A14' }}>
      {/* Court background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <svg width="400" height="200" viewBox="0 0 400 200">
          <rect x="10" y="10" width="380" height="180" fill="none" stroke="#F97316" strokeWidth="2" />
          <rect x="10" y="60" width="80" height="80" fill="none" stroke="#F97316" strokeWidth="1.5" />
          <rect x="310" y="60" width="80" height="80" fill="none" stroke="#F97316" strokeWidth="1.5" />
          <circle cx="200" cy="100" r="30" fill="none" stroke="#F97316" strokeWidth="1.5" />
          <line x1="200" y1="10" x2="200" y2="190" stroke="#F97316" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Flow diagram */}
      <div className="relative flex items-center justify-center gap-3 flex-wrap">
        {[
          { label: 'Player\nHolds Ball', color: '#2563EB', sub: 'Player Control' },
          { label: 'Pass to\nTeammate', color: '#F97316', sub: 'Team Control' },
          { label: 'Teammate\nCatches', color: '#2563EB', sub: 'Player Control' },
          { label: 'Shot\nAttempt', color: '#EF4444', sub: 'Control Ends' },
        ].map((node, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-center mb-1"
                style={{ background: `${node.color}15`, border: `1.5px solid ${node.color}40` }}
              >
                <span className="font-display text-sm font-bold text-white leading-tight whitespace-pre-line">{node.label}</span>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: node.color }}>{node.sub}</div>
            </div>
            {i < 3 && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 7l5 5-5 5" stroke="#1E3052" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
