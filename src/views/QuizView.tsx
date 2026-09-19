import { useState, useEffect } from 'react'
import { quizQuestions } from '../data'
import type { Navigate } from '../App'

interface Props { navigate: Navigate }

export function QuizView({ navigate }: Props) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45)
  const [timerActive, setTimerActive] = useState(true)
  const [answers, setAnswers] = useState<number[]>([])

  const questions = quizQuestions
  const q = questions[current]
  const total = questions.length

  useEffect(() => {
    if (!timerActive || confirmed) return
    if (timeLeft <= 0) {
      handleConfirm()
      return
    }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, timerActive, confirmed])

  const handleSelect = (i: number) => {
    if (confirmed) return
    setSelected(i)
  }

  const handleConfirm = () => {
    if (selected === null && timeLeft > 0) return
    setConfirmed(true)
    setTimerActive(false)
    if (selected === q.correct) setScore(s => s + 1)
    setAnswers(prev => [...prev, selected ?? -1])
  }

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setConfirmed(false)
      setTimeLeft(45)
      setTimerActive(true)
    } else {
      navigate({ view: 'quiz-results', quizScore: score + (selected === q.correct ? 1 : 0), quizTotal: total })
    }
  }

  const timerPct = (timeLeft / 45) * 100
  const timerColor = timeLeft > 20 ? '#16A34A' : timeLeft > 10 ? '#F97316' : '#EF4444'

  return (
    <div className="min-h-screen dot-grid flex flex-col">
      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-[#1E3052] bg-[#09101E]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate({ view: 'dashboard' })}
            className="text-[#5A7090] hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 14L7 9l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <div>
            <div className="font-display text-lg font-bold uppercase tracking-wider text-white">Module 02 Quiz</div>
            <div className="text-xs text-[#5A7090] font-mono">Team Control & Player Control</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke={timerColor} strokeWidth="1.3" /><path d="M7 4v3l2 2" stroke={timerColor} strokeWidth="1.2" strokeLinecap="round" /></svg>
            <span className="font-mono text-sm font-bold" style={{ color: timerColor }}>{timeLeft}s</span>
          </div>
          <div className="text-xs text-[#5A7090]">
            Score: <span className="text-white font-semibold">{score}/{current}</span>
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1 bg-[#142038] flex-shrink-0">
        <div
          className="h-full transition-all duration-1000"
          style={{ width: `${timerPct}%`, background: timerColor }}
        />
      </div>

      {/* Question progress */}
      <div className="flex-shrink-0 flex items-center gap-1.5 px-6 py-3">
        {questions.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{
              background: i < current
                ? (answers[i] === questions[i].correct ? '#16A34A' : '#EF4444')
                : i === current ? '#F97316' : '#142038',
            }}
          />
        ))}
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-2xl">
          {/* Question number + type */}
          <div className="flex items-center gap-3 mb-5 anim-fade-in">
            <div className="font-mono text-4xl font-bold text-[#142038]">
              {String(current + 1).padStart(2, '0')}
            </div>
            <div>
              <div
                className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest inline-block"
                style={{
                  background: q.type === 'scenario' ? 'rgba(239,68,68,0.1)' : q.type === 'true-false' ? 'rgba(37,99,235,0.1)' : 'rgba(139,92,246,0.1)',
                  color: q.type === 'scenario' ? '#EF4444' : q.type === 'true-false' ? '#2563EB' : '#8B5CF6',
                }}
              >
                {q.type === 'scenario' ? 'On-Court Scenario' : q.type === 'true-false' ? 'True / False' : 'Multiple Choice'}
              </div>
              <div className="text-[10px] text-[#4B6080] font-mono mt-0.5">{q.article} · {q.concept}</div>
            </div>
          </div>

          {/* Game situation (for scenario type) */}
          {q.situation && (
            <div
              className="rounded-xl p-5 mb-5 border anim-fade-up"
              style={{ background: 'rgba(239,68,68,0.04)', borderColor: 'rgba(239,68,68,0.2)' }}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#EF4444] mb-2">Game Situation</div>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">{q.situation}</p>
            </div>
          )}

          {/* Question text */}
          <h2 className="font-display text-3xl font-bold text-white leading-tight mb-6 anim-fade-up anim-d1">
            {q.question}
          </h2>

          {/* Options */}
          <div className="space-y-2 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              const isCorrect = q.correct === i
              let bg = '#09101E'
              let border = '#1E3052'
              let textColor = '#CBD5E1'
              let leftBar = 'transparent'

              if (confirmed) {
                if (isCorrect) {
                  bg = 'rgba(22,163,74,0.07)'; border = 'rgba(22,163,74,0.4)'; textColor = '#86EFAC'; leftBar = '#16A34A'
                } else if (isSelected) {
                  bg = 'rgba(239,68,68,0.07)'; border = 'rgba(239,68,68,0.4)'; textColor = '#FCA5A5'; leftBar = '#EF4444'
                } else {
                  textColor = '#3A5070'
                }
              } else if (isSelected) {
                border = '#F97316'; bg = 'rgba(249,115,22,0.07)'; leftBar = '#F97316'
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={confirmed}
                  className="w-full flex items-center gap-0 rounded-xl overflow-hidden border text-left transition-all duration-200 anim-fade-up"
                  style={{
                    borderColor: border, background: bg,
                    animationDelay: `${0.1 + i * 0.07}s`,
                    cursor: confirmed ? 'default' : 'pointer',
                  }}
                >
                  {/* Left accent bar */}
                  <div className="w-1 self-stretch flex-shrink-0 transition-colors" style={{ background: leftBar }} />

                  <div className="flex items-center gap-3 p-4 flex-1">
                    {/* Option letter */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                      style={{
                        background: confirmed && isCorrect ? 'rgba(22,163,74,0.2)' : confirmed && isSelected ? 'rgba(239,68,68,0.2)' : isSelected ? 'rgba(249,115,22,0.2)' : '#142038',
                        color: confirmed && isCorrect ? '#16A34A' : confirmed && isSelected ? '#EF4444' : isSelected ? '#F97316' : '#5A7090',
                      }}
                    >
                      {confirmed && isCorrect ? '✓' : confirmed && isSelected && !isCorrect ? '✗' : String.fromCharCode(65 + i)}
                    </div>

                    <span className="text-sm leading-relaxed" style={{ color: textColor }}>{opt}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {confirmed && (
            <div
              className="rounded-xl p-5 mb-6 border anim-scale-in"
              style={{
                background: selected === q.correct ? 'rgba(22,163,74,0.05)' : 'rgba(239,68,68,0.05)',
                borderColor: selected === q.correct ? 'rgba(22,163,74,0.25)' : 'rgba(239,68,68,0.25)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest font-bold"
                  style={{ color: selected === q.correct ? '#16A34A' : '#EF4444' }}
                >
                  {selected === q.correct ? '✓ Correct' : '✗ Incorrect'}
                </span>
                <span className="text-[#2A3D55]">·</span>
                <span className="font-mono text-[10px] text-[#4B6080] uppercase tracking-wider">{q.article}</span>
              </div>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {/* Action button */}
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: selected !== null ? '#F97316' : '#142038',
                color: selected !== null ? '#fff' : '#5A7090',
              }}
            >
              Confirm Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all orange-glow"
              style={{ background: '#F97316', color: '#fff' }}
            >
              {current < total - 1 ? 'Next Question →' : 'View Results →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
