import { useState, useRef } from 'react'
import { knowledgeNodes, knowledgeEdges, type KNode, type NodeCategory } from '../data'
import type { Navigate } from '../App'

const categoryColors: Record<NodeCategory, string> = {
  foundation: '#2563EB',
  control:    '#16A34A',
  status:     '#F97316',
  violation:  '#EF4444',
  foul:       '#EC4899',
  procedure:  '#8B5CF6',
  mechanics:  '#14B8A6',
}

const categoryLabels: Record<NodeCategory, string> = {
  foundation: 'Foundation',
  control:    'Control',
  status:     'Ball Status',
  violation:  'Violation',
  foul:       'Foul',
  procedure:  'Procedure',
  mechanics:  'Mechanics',
}

interface Props { navigate: Navigate }

export function KnowledgeMap({ navigate }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>('teamControl')
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [filter, setFilter] = useState<NodeCategory | 'all'>('all')
  const svgRef = useRef<SVGSVGElement>(null)

  const selected = knowledgeNodes.find(n => n.id === selectedId)

  const isHighlighted = (nodeId: string) => {
    if (!selectedId) return true
    if (nodeId === selectedId) return true
    if (selected?.prerequisites.includes(nodeId)) return true
    const dependents = knowledgeNodes.filter(n => n.prerequisites.includes(selectedId))
    return dependents.some(n => n.id === nodeId)
  }

  const filteredNodes = knowledgeNodes.filter(n =>
    filter === 'all' || n.category === filter
  )

  const visibleNodeIds = new Set(filteredNodes.map(n => n.id))
  const visibleEdges = knowledgeEdges.filter(
    e => visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to)
  )

  // Determine if an edge is "active" (connected to selected node)
  const isEdgeActive = (edge: { from: string; to: string }) => {
    if (!selectedId) return false
    return edge.from === selectedId || edge.to === selectedId ||
      selected?.prerequisites.includes(edge.from) ||
      selected?.prerequisites.includes(edge.to)
  }

  return (
    <div className="h-screen flex flex-col bg-[#070B14]">
      {/* Top toolbar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-[#1E3052] bg-[#09101E]">
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-white">Knowledge Map</h1>
          <p className="text-xs text-[#5A7090] font-mono">Concept dependency graph — FIBA Grade 3</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Category filter */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === 'all' ? 'bg-[#F97316] text-white' : 'border border-[#1E3052] text-[#5A7090] hover:text-white'}`}
            >
              All
            </button>
            {(Object.keys(categoryColors) as NodeCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hidden lg:block ${filter === cat ? 'text-white' : 'border border-[#1E3052] text-[#5A7090] hover:text-white'}`}
                style={filter === cat ? { background: categoryColors[cat] } : {}}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* SVG Graph */}
        <div className="flex-1 relative overflow-hidden">
          {/* Background dots */}
          <div className="absolute inset-0 dot-grid opacity-50" />

          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1100 850"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#1E3052" />
              </marker>
              <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(249,115,22,0.6)" />
              </marker>
              {/* Glow filter for selected node */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Draw edges first */}
            <g>
              {visibleEdges.map((edge, i) => {
                const fromNode = knowledgeNodes.find(n => n.id === edge.from)
                const toNode = knowledgeNodes.find(n => n.id === edge.to)
                if (!fromNode || !toNode) return null

                const active = isEdgeActive(edge)
                const dimmed = selectedId !== null && !active

                // Simple straight line with offset for arrow
                const dx = toNode.x - fromNode.x
                const dy = toNode.y - fromNode.y
                const len = Math.sqrt(dx * dx + dy * dy)
                const nx = dx / len
                const ny = dy / len
                const nodeRadius = 36

                const x1 = fromNode.x + nx * nodeRadius
                const y1 = fromNode.y + ny * nodeRadius
                const x2 = toNode.x - nx * (nodeRadius + 6)
                const y2 = toNode.y - ny * (nodeRadius + 6)

                return (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={active ? 'rgba(249,115,22,0.55)' : 'rgba(30,48,82,0.6)'}
                    strokeWidth={active ? 2 : 1.5}
                    markerEnd={`url(#${active ? 'arrowhead-active' : 'arrowhead'})`}
                    opacity={dimmed ? 0.15 : 1}
                    className="transition-all duration-300"
                  />
                )
              })}
            </g>

            {/* Draw nodes */}
            <g>
              {knowledgeNodes.map(node => {
                const visible = visibleNodeIds.has(node.id)
                if (!visible) return null

                const isSelected = node.id === selectedId
                const isHovered = node.id === hoverId
                const highlighted = isHighlighted(node.id)
                const dimmed = selectedId !== null && !highlighted
                const color = categoryColors[node.category]

                const radius = isSelected ? 42 : 36
                const textLines = node.label.split('\n')

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(selectedId === node.id ? null : node.id)}
                    onMouseEnter={() => setHoverId(node.id)}
                    onMouseLeave={() => setHoverId(null)}
                    opacity={dimmed ? 0.2 : 1}
                    filter={isSelected ? 'url(#glow)' : undefined}
                    style={{ transition: 'opacity 0.3s, transform 0.2s' }}
                  >
                    {/* Outer ring for selected/hovered */}
                    {(isSelected || isHovered) && (
                      <circle
                        r={radius + 6}
                        fill="none"
                        stroke={color}
                        strokeWidth="1.5"
                        opacity="0.3"
                      />
                    )}

                    {/* Main circle */}
                    <circle
                      r={radius}
                      fill={`${color}18`}
                      stroke={color}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />

                    {/* Mastery arc */}
                    {node.mastery > 0 && (
                      <circle
                        r={radius - 4}
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * (radius - 4) * node.mastery / 100} ${2 * Math.PI * (radius - 4)}`}
                        transform="rotate(-90)"
                        opacity="0.5"
                      />
                    )}

                    {/* Article label */}
                    <text
                      y={-radius - 10}
                      textAnchor="middle"
                      fontSize="9"
                      fill={color}
                      fontFamily="'JetBrains Mono', monospace"
                      fontWeight="500"
                      opacity="0.8"
                    >
                      {node.article}
                    </text>

                    {/* Node label */}
                    {textLines.map((line, li) => (
                      <text
                        key={li}
                        y={textLines.length === 1 ? 5 : li * 14 - 6}
                        textAnchor="middle"
                        fontSize={isSelected ? 11 : 10}
                        fontFamily="'Barlow Condensed', sans-serif"
                        fontWeight="700"
                        fill="#F1F5F9"
                        letterSpacing="0.5"
                      >
                        {line}
                      </text>
                    ))}

                    {/* Mastery indicator */}
                    {node.mastery === 100 && (
                      <circle r="8" cx={radius - 6} cy={-radius + 6} fill="#16A34A" stroke="#09101E" strokeWidth="2">
                        <title>Mastered</title>
                      </circle>
                    )}
                  </g>
                )
              })}
            </g>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 glass rounded-xl p-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#4B6080] mb-2">Categories</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {(Object.entries(categoryColors) as [NodeCategory, string][]).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5 text-[10px] text-[#8B9BB4]">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  {categoryLabels[cat]}
                </div>
              ))}
            </div>
          </div>

          {/* Mastery hint */}
          <div className="absolute bottom-4 right-4 glass rounded-xl p-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#4B6080] mb-1">Ring = Mastery</div>
            <div className="flex items-center gap-2 text-[10px] text-[#8B9BB4]">
              <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#16A34A' }} />
              <span>Green dot = 100%</span>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        {selected && (
          <div className="w-80 flex-shrink-0 border-l border-[#1E3052] overflow-y-auto bg-[#09101E] anim-slide-r">
            <div className="p-5">
              {/* Node header */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: `${categoryColors[selected.category]}15`, color: categoryColors[selected.category] }}
                  >
                    {categoryLabels[selected.category]}
                  </span>
                  <span className="font-mono text-xs text-[#4B6080]">{selected.article}</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wide leading-tight mb-2">
                  {selected.label.replace('\n', ' ')}
                </h2>

                {/* Mastery bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#142038] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${selected.mastery}%`, background: categoryColors[selected.category] }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[#5A7090]">{selected.mastery}%</span>
                </div>
              </div>

              {/* Description */}
              <div className="glass rounded-xl p-4 mb-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#4B6080] mb-2">Concept</div>
                <p className="text-sm text-[#CBD5E1] leading-relaxed">{selected.description}</p>
              </div>

              {/* Prerequisites */}
              {selected.prerequisites.length > 0 && (
                <div className="mb-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#5A7090] mb-2">Prerequisites</div>
                  <div className="space-y-1">
                    {selected.prerequisites.map(prereqId => {
                      const prereq = knowledgeNodes.find(n => n.id === prereqId)
                      if (!prereq) return null
                      return (
                        <button
                          key={prereqId}
                          onClick={() => setSelectedId(prereqId)}
                          className="w-full flex items-center gap-2 p-2.5 rounded-lg text-left hover:bg-[#0D1525] transition-colors"
                          style={{ border: `1px solid ${categoryColors[prereq.category]}20` }}
                        >
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: categoryColors[prereq.category] }} />
                          <span className="text-sm text-[#CBD5E1]">{prereq.label.replace('\n', ' ')}</span>
                          <span className="font-mono text-[10px] text-[#4B6080] ml-auto">{prereq.article}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Dependents (what needs this node) */}
              {(() => {
                const dependents = knowledgeNodes.filter(n => n.prerequisites.includes(selected.id))
                return dependents.length > 0 ? (
                  <div className="mb-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#5A7090] mb-2">Enables</div>
                    <div className="space-y-1">
                      {dependents.slice(0, 5).map(dep => (
                        <button
                          key={dep.id}
                          onClick={() => setSelectedId(dep.id)}
                          className="w-full flex items-center gap-2 p-2.5 rounded-lg text-left hover:bg-[#0D1525] transition-colors"
                          style={{ border: `1px solid ${categoryColors[dep.category]}20` }}
                        >
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: categoryColors[dep.category] }} />
                          <span className="text-sm text-[#CBD5E1]">{dep.label.replace('\n', ' ')}</span>
                          <span className="font-mono text-[10px] text-[#4B6080] ml-auto">{dep.article}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null
              })()}

              {/* Official text */}
              {selected.officialText && (
                <div className="mb-4 rounded-xl p-4 border" style={{ borderColor: 'rgba(249,115,22,0.2)', background: 'rgba(249,115,22,0.04)' }}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#F97316] mb-2">Official Rule</div>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">{selected.officialText}</p>
                </div>
              )}

              {/* IOT */}
              {selected.iotNote && (
                <div className="mb-4 rounded-xl p-4 border" style={{ borderColor: 'rgba(20,184,166,0.2)', background: 'rgba(20,184,166,0.04)' }}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#14B8A6] mb-2">IOT</div>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">{selected.iotNote}</p>
                </div>
              )}

              {/* 3PO */}
              {selected.threePONote && (
                <div className="mb-4 rounded-xl p-4 border" style={{ borderColor: 'rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.04)' }}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#8B5CF6] mb-2">3PO</div>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">{selected.threePONote}</p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => navigate({ view: 'lesson', moduleId: 'm02', lessonId: 'l02-03' })}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: '#F97316', color: '#fff' }}
                >
                  Go to Lesson
                </button>
                <button
                  onClick={() => navigate({ view: 'quiz' })}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold border border-[#1E3052] text-[#8B9BB4] hover:border-[#2A4070] hover:text-white transition-all"
                >
                  Quiz on This Concept
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty panel hint */}
        {!selected && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-center text-[#2A3D55]">
            <div className="text-4xl mb-2 opacity-30">←</div>
            <div className="text-xs font-mono uppercase tracking-wider">Click a node</div>
          </div>
        )}
      </div>
    </div>
  )
}
