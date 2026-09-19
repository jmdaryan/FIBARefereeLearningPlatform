import { useState, useEffect } from 'react'
import { knowledgeNodes } from '../data'
import type { Navigate } from '../App'

interface Props { navigate: Navigate; query: string }

const searchResults = [
  { type: 'concept',       label: 'Team Control',          meta: 'Art. 14', sub: 'Module 02 · Lesson 03', color: '#16A34A' },
  { type: 'rule',          label: 'Art. 14 — Team Control', meta: 'Official Rule', sub: 'FIBA Basketball Rules 2024', color: '#F97316' },
  { type: 'interpretation',label: 'Interpretation 14-1',   meta: 'Official Interpretation', sub: 'Ball at disposal for throw-in', color: '#2563EB' },
  { type: 'iot',           label: 'Team Control — IOT',    meta: 'IOT Guide', sub: 'Trail: monitor 3-sec and shot clock', color: '#14B8A6' },
  { type: '3po',           label: 'Team Control — 3PO',    meta: '3PO Guide', sub: 'Lead, Center, Trail responsibilities', color: '#8B5CF6' },
  { type: 'quiz',          label: 'When does Team Control begin?', meta: 'Quiz Question', sub: 'Art. 14 · Medium', color: '#EC4899' },
]

export function SearchView({ navigate, query: initialQuery }: Props) {
  const [q, setQ] = useState(initialQuery)
  const [filter, setFilter] = useState<string>('all')

  const types = ['all', 'concept', 'rule', 'interpretation', 'iot', '3po', 'quiz']

  const filtered = searchResults.filter(r =>
    filter === 'all' || r.type === filter
  )

  const typeLabels: Record<string, string> = {
    concept: 'Concept', rule: 'Official Rule', interpretation: 'Interpretation',
    iot: 'IOT', '3po': '3PO', quiz: 'Quiz Question',
  }

  return (
    <div className="min-h-screen dot-grid p-8">
      {/* Search input */}
      <div className="max-w-2xl mb-8 anim-fade-up">
        <label className="font-mono text-xs uppercase tracking-widest text-[#4B6080] block mb-3">Global Search</label>
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A7090]" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 12l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search rules, concepts, interpretations, IOT, 3PO..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#1E3052] bg-[#0D1525] text-white placeholder-[#3A5070] text-sm focus:outline-none focus:border-[#F97316] transition-colors"
          />
        </div>
      </div>

      {/* Type filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap anim-fade-up anim-d1">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === t ? 'bg-[#F97316] text-white' : 'border border-[#1E3052] text-[#5A7090] hover:text-white'
            }`}
          >
            {t === 'all' ? 'All Results' : typeLabels[t] ?? t}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="font-mono text-xs uppercase tracking-widest text-[#4B6080] mb-4">
        {filtered.length} results {q && `for "${q}"`}
      </div>

      {/* Results */}
      <div className="space-y-2 max-w-3xl">
        {filtered.map((result, i) => (
          <button
            key={i}
            onClick={() => navigate({ view: result.type === 'concept' || result.type === 'iot' || result.type === '3po' ? 'map' : 'lesson', moduleId: 'm02', lessonId: 'l02-03' })}
            className="w-full glass rounded-xl p-5 flex items-center gap-4 text-left card-hover border border-[#1E3052] anim-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.05}s` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ background: `${result.color}15`, color: result.color, border: `1px solid ${result.color}30` }}
            >
              {result.type === 'concept' ? 'CON' :
               result.type === 'rule' ? 'ART' :
               result.type === 'interpretation' ? 'INT' :
               result.type === 'iot' ? 'IOT' :
               result.type === '3po' ? '3PO' : 'QZ'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-white text-sm">{result.label}</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                  style={{ background: `${result.color}15`, color: result.color }}
                >
                  {typeLabels[result.type] ?? result.type}
                </span>
              </div>
              <div className="text-xs text-[#5A7090] truncate">{result.sub}</div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-mono text-[10px] text-[#4B6080]">{result.meta}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#5A7090" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
          </button>
        ))}
      </div>

      {/* Related concepts */}
      <div className="mt-8 max-w-3xl anim-fade-up anim-d4">
        <div className="font-mono text-xs uppercase tracking-widest text-[#4B6080] mb-3">Related Concepts</div>
        <div className="flex items-center gap-2 flex-wrap">
          {knowledgeNodes.slice(0, 8).map(node => (
            <button
              key={node.id}
              onClick={() => navigate({ view: 'map' })}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#1E3052] text-[#8B9BB4] hover:border-[#F97316] hover:text-[#F97316] transition-all"
            >
              {node.label.replace('\n', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
