export type NodeCategory = 'foundation' | 'control' | 'status' | 'violation' | 'foul' | 'procedure' | 'mechanics'

export interface KNode {
  id: string
  label: string
  article: string
  x: number
  y: number
  category: NodeCategory
  mastery: number
  description: string
  prerequisites: string[]
  officialText?: string
  iotNote?: string
  threePONote?: string
}

export interface KEdge {
  from: string
  to: string
}

export interface Lesson {
  id: string
  title: string
  duration: string
  status: 'locked' | 'available' | 'completed' | 'in-progress'
}

export interface Module {
  id: string
  number: number
  title: string
  subtitle: string
  articles: string
  lessons: Lesson[]
  progress: number
  status: 'locked' | 'available' | 'in-progress' | 'completed'
  color: string
}

export interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'true-false' | 'scenario'
  question: string
  situation?: string
  options: string[]
  correct: number
  explanation: string
  article: string
  concept: string
}

// ────────────────────────────────────────────────
// KNOWLEDGE GRAPH NODES  (SVG viewBox 0 0 1060 780)
// ────────────────────────────────────────────────
export const knowledgeNodes: KNode[] = [
  {
    id: 'court', label: 'Court &\nEquipment', article: 'Art. 2',
    x: 80,  y: 55, category: 'foundation', mastery: 100,
    description: 'The playing court dimensions, surface, markings, baskets, and technical equipment.',
    prerequisites: [],
    officialText: 'The playing court shall be a flat, hard surface free from obstructions with dimensions of 28 m in length by 15 m in width.',
    iotNote: 'The official must inspect the court, basket, and backboard before the game.',
  },
  {
    id: 'ball', label: 'Ball', article: 'Art. 3',
    x: 280, y: 55, category: 'foundation', mastery: 100,
    description: 'The ball specification, circumference, pressure, and conditions of use.',
    prerequisites: [],
    officialText: 'The ball shall be spherical and shall be an official FIBA approved ball.',
  },
  {
    id: 'players', label: 'Players', article: 'Art. 4',
    x: 480, y: 55, category: 'foundation', mastery: 100,
    description: 'Classification of players: eligible, on court, bench, captain.',
    prerequisites: ['court'],
    officialText: 'Each team shall consist of no more than 12 players eligible to play.',
  },
  {
    id: 'teams', label: 'Teams', article: 'Art. 4–6',
    x: 700, y: 55, category: 'foundation', mastery: 80,
    description: 'Team composition, bench personnel, team captain duties.',
    prerequisites: ['players'],
    officialText: 'Each team shall consist of team members: players, the head coach, assistant coaches and other bench personnel.',
  },
  {
    id: 'officials', label: 'Officials', article: 'Art. 48',
    x: 920, y: 55, category: 'foundation', mastery: 60,
    description: 'The game officials: referee, umpires; their authority and responsibilities.',
    prerequisites: ['court'],
    iotNote: 'Officials must be in position before the jump ball and maintain correct court coverage throughout.',
    threePONote: 'In 3PO, officials are designated as Lead (L), Center (C), and Trail (T).',
  },
  {
    id: 'playerControl', label: 'Player\nControl', article: 'Art. 15',
    x: 280, y: 195, category: 'control', mastery: 90,
    description: 'A player is in control of the ball by holding or dribbling it while standing or running.',
    prerequisites: ['players', 'ball'],
    officialText: 'A player is in control of the ball (player control) when the player is holding or dribbling a live ball.',
    iotNote: 'Establish a clear observation angle before judging whether a player has control.',
  },
  {
    id: 'teamControl', label: 'Team\nControl', article: 'Art. 14',
    x: 530, y: 195, category: 'control', mastery: 75,
    description: 'A team is in control when a player of that team has player control, or the ball is at a player\'s disposal.',
    prerequisites: ['players', 'teams', 'playerControl'],
    officialText: 'A team is in control of the ball when a player of the team is in control of the ball, or the ball is being passed between players of the same team, or the ball is at the disposal of a player of the team for a throw-in or free throw.',
    iotNote: 'Track Team Control to determine applicability of time violations (3 sec, 8 sec, 24 sec).',
    threePONote: 'Trail official typically manages Team Control related time violations (3-sec, shot clock).',
  },
  {
    id: 'liveBall', label: 'Live Ball', article: 'Art. 16',
    x: 160, y: 340, category: 'status', mastery: 85,
    description: 'The ball is live from the moment it is at the official\'s disposal for a throw-in, free throw, or jump ball.',
    prerequisites: ['ball', 'players'],
    officialText: 'The ball becomes live when: during a jump ball, it is legally tapped by a jumper. During a free throw or throw-in, it is at the disposal of the player.',
  },
  {
    id: 'deadBall', label: 'Dead Ball', article: 'Art. 16',
    x: 420, y: 340, category: 'status', mastery: 85,
    description: 'The ball becomes dead when a signal sounds, a foul occurs, a violation is committed, or a successful goal is scored.',
    prerequisites: ['ball', 'players'],
    officialText: 'The ball becomes dead when: a field goal or free throw is successful, an official\'s whistle sounds, the game clock signal sounds, a foul occurs, or certain violations occur.',
  },
  {
    id: 'statusBall', label: 'Status of\nthe Ball', article: 'Art. 16–17',
    x: 640, y: 340, category: 'status', mastery: 65,
    description: 'Understanding whether the ball is live or dead at any given moment determines what play is valid.',
    prerequisites: ['liveBall', 'deadBall', 'teamControl', 'playerControl'],
    officialText: 'The status of the ball determines when violations, fouls, and scores are valid. Officials must continuously track the status of the ball.',
    iotNote: 'Always know the status of the ball — live or dead. This drives every decision.',
    threePONote: 'All three officials must reach consensus on ball status before restart.',
  },
  {
    id: 'shotClock', label: 'Shot Clock', article: 'Art. 29',
    x: 870, y: 340, category: 'status', mastery: 50,
    description: '24-second and 14-second reset rules governing possession time limits.',
    prerequisites: ['teamControl', 'statusBall'],
    officialText: 'A team that is in control of the ball must attempt a shot for a field goal within 24 seconds (or 14 after an offensive rebound in the opponents\' half-court).',
    threePONote: 'Trail is primarily responsible for monitoring the shot clock. Lead notifies if shot clock is not visible.',
  },
  {
    id: 'travelling', label: 'Travelling', article: 'Art. 25',
    x: 80,  y: 490, category: 'violation', mastery: 60,
    description: 'A player who holds the ball may not move one or both feet illegally beyond prescribed limits.',
    prerequisites: ['playerControl', 'statusBall'],
    officialText: 'Travelling occurs when a player who is in control of a live ball in-bounds moves one or both feet illegally.',
    iotNote: 'Observe the pivot foot from a good angle. Do not guess — get position first.',
    threePONote: 'Primary responsibility usually with the official in the best angle to the ball.',
  },
  {
    id: 'dribbling', label: 'Dribbling\nViolations', article: 'Art. 24',
    x: 270, y: 490, category: 'violation', mastery: 70,
    description: 'Double dribble and carrying the ball violations.',
    prerequisites: ['playerControl', 'statusBall'],
    officialText: 'A dribble ends when the dribbler: touches the ball simultaneously with both hands, or permits the ball to come to rest in one or both hands.',
    iotNote: 'Carry/palming requires careful observation from an angle that reveals the hand position under the ball.',
  },
  {
    id: 'threeSec', label: '3-Second\nRule', article: 'Art. 26',
    x: 460, y: 490, category: 'violation', mastery: 55,
    description: 'A player of the team in control shall not remain in the opponents\' restricted area for more than 3 consecutive seconds.',
    prerequisites: ['teamControl', 'statusBall'],
    officialText: 'Art. 26.1: A player shall not remain in the opponents\' restricted area for more than 3 consecutive seconds while their team is in control of a live ball in the frontcourt.',
    threePONote: 'Lead official has primary responsibility for the 3-second count in the paint.',
  },
  {
    id: 'personalFoul', label: 'Personal\nFoul', article: 'Art. 33',
    x: 650, y: 490, category: 'foul', mastery: 45,
    description: 'Illegal contact with an opponent while the ball is live. Most common type of foul.',
    prerequisites: ['players', 'playerControl', 'statusBall'],
    officialText: 'A personal foul is a player foul that involves illegal contact with an opponent.',
    iotNote: 'Use the verticality principle, cylinder principle, and advantage/disadvantage to judge contact.',
    threePONote: 'The official with the best angle to the point of contact has primary responsibility to call the foul.',
  },
  {
    id: 'technicalFoul', label: 'Technical\nFoul', article: 'Art. 38',
    x: 850, y: 490, category: 'foul', mastery: 40,
    description: 'Non-contact infraction by player or bench personnel demonstrating unsportsmanlike conduct.',
    prerequisites: ['players', 'teams'],
    officialText: 'A technical foul is a team foul, but it is not a player foul involving contact with an opponent.',
    iotNote: 'Technical fouls require clear communication and firm, calm handling by officials.',
    threePONote: 'All officials share responsibility. The official who witnesses the infraction calls the technical foul.',
  },
  {
    id: 'unsportsmanlike', label: 'Unsports-\nmanlike Foul', article: 'Art. 37',
    x: 1000, y: 490, category: 'foul', mastery: 30,
    description: 'Contact foul with no legitimate attempt to play the ball — excessive or brutal contact.',
    prerequisites: ['personalFoul'],
    officialText: 'An unsportsmanlike foul is a player foul that involves contact with an opponent, judged as: no legitimate attempt to play the ball, or excessive, hard contact.',
    iotNote: 'The standard is: Was there a legitimate attempt to play the ball? Use this benchmark consistently.',
  },
  {
    id: 'throwIn', label: 'Throw-in', article: 'Art. 20',
    x: 190, y: 635, category: 'procedure', mastery: 55,
    description: 'Method to put the ball in play from out-of-bounds after a dead ball.',
    prerequisites: ['statusBall', 'deadBall'],
    officialText: 'A throw-in is the method of putting the ball into play from out-of-bounds.',
    iotNote: 'Ensure 5-second count is observed. Watch for line violations and early releases.',
    threePONote: 'The official closest to the out-of-bounds spot typically administers the throw-in.',
  },
  {
    id: 'freeThrow', label: 'Free Throw', article: 'Art. 21',
    x: 430, y: 635, category: 'procedure', mastery: 35,
    description: 'An unhindered attempt to score awarded as a penalty for certain fouls.',
    prerequisites: ['personalFoul', 'technicalFoul'],
    officialText: 'A free throw is an opportunity given to a player to score 1 point, unguarded, from behind the free throw line.',
    iotNote: 'The trail official administers the free throw. Monitor lane players. Ensure shooter is behind the line.',
    threePONote: 'Lead monitors lane violations on far side. Trail administers. Center monitors near side of lane.',
  },
  {
    id: 'gameProcs', label: 'Game\nProcedures', article: 'Art. 7–8',
    x: 670, y: 635, category: 'procedure', mastery: 70,
    description: 'Jump ball, tip-off, periods, overtime, game clock management.',
    prerequisites: ['statusBall'],
    officialText: 'The game shall be played between two teams of five players each. The team that scores the greater number of points in the allotted time shall be the winner.',
    threePONote: 'Pre-game meeting between officials is mandatory. Responsibilities must be clearly assigned before tip-off.',
  },
  {
    id: 'iot', label: 'IOT', article: 'IOT Guide',
    x: 220, y: 760, category: 'mechanics', mastery: 25,
    description: 'Individual Officiating Techniques — positioning, mechanics, signal usage, and observation principles.',
    prerequisites: [],
    iotNote: 'IOT covers: court coverage, angles, communication, judgment standards, and professionalism.',
  },
  {
    id: 'threePO', label: '3PO', article: '3PO Guide',
    x: 680, y: 760, category: 'mechanics', mastery: 20,
    description: 'Three-Person Officiating — Lead, Center, Trail roles, rotation, coverage zones, communication.',
    prerequisites: ['iot'],
    threePONote: 'Lead (L), Center (C), Trail (T) have defined primary areas and rotation triggers based on ball and player movement.',
  },
]

export const knowledgeEdges: KEdge[] = [
  { from: 'court',        to: 'players'       },
  { from: 'court',        to: 'officials'     },
  { from: 'ball',         to: 'playerControl' },
  { from: 'players',      to: 'teams'         },
  { from: 'players',      to: 'playerControl' },
  { from: 'teams',        to: 'teamControl'   },
  { from: 'teams',        to: 'technicalFoul' },
  { from: 'playerControl',to: 'teamControl'   },
  { from: 'playerControl',to: 'dribbling'     },
  { from: 'playerControl',to: 'travelling'    },
  { from: 'playerControl',to: 'personalFoul'  },
  { from: 'teamControl',  to: 'statusBall'    },
  { from: 'teamControl',  to: 'threeSec'      },
  { from: 'teamControl',  to: 'shotClock'     },
  { from: 'ball',         to: 'liveBall'      },
  { from: 'ball',         to: 'deadBall'      },
  { from: 'players',      to: 'liveBall'      },
  { from: 'liveBall',     to: 'statusBall'    },
  { from: 'deadBall',     to: 'statusBall'    },
  { from: 'statusBall',   to: 'throwIn'       },
  { from: 'statusBall',   to: 'travelling'    },
  { from: 'statusBall',   to: 'dribbling'     },
  { from: 'statusBall',   to: 'personalFoul'  },
  { from: 'statusBall',   to: 'gameProcs'     },
  { from: 'personalFoul', to: 'freeThrow'     },
  { from: 'personalFoul', to: 'unsportsmanlike'},
  { from: 'technicalFoul',to: 'freeThrow'     },
  { from: 'throwIn',      to: 'gameProcs'     },
  { from: 'iot',          to: 'threePO'       },
]

// ────────────────────────────────────────────────
// MODULES
// ────────────────────────────────────────────────
export const modules: Module[] = [
  {
    id: 'm01', number: 1,
    title: 'Foundations',
    subtitle: 'Court, Equipment & Basic Game Structure',
    articles: 'Art. 1–3',
    color: '#2563EB',
    lessons: [
      { id: 'l01-01', title: 'Welcome & Course Overview',      duration: '8 min',  status: 'completed' },
      { id: 'l01-02', title: 'The Basketball Court',           duration: '12 min', status: 'completed' },
      { id: 'l01-03', title: 'Equipment & Ball Specifications', duration: '10 min', status: 'completed' },
      { id: 'l01-04', title: 'Basic Game Structure',           duration: '14 min', status: 'completed' },
    ],
    progress: 100, status: 'completed',
  },
  {
    id: 'm02', number: 2,
    title: 'Players, Teams & Control',
    subtitle: 'Players, Teams, Player Control & Team Control',
    articles: 'Art. 4–6, 14–15',
    color: '#16A34A',
    lessons: [
      { id: 'l02-01', title: 'Players & Teams',     duration: '14 min', status: 'completed'   },
      { id: 'l02-02', title: 'Player Control',       duration: '18 min', status: 'completed'   },
      { id: 'l02-03', title: 'Team Control',         duration: '20 min', status: 'in-progress' },
      { id: 'l02-04', title: 'Ball Control Concept', duration: '12 min', status: 'locked'      },
    ],
    progress: 65, status: 'in-progress',
  },
  {
    id: 'm03', number: 3,
    title: 'Status of the Ball',
    subtitle: 'Live Ball, Dead Ball & Ball Status',
    articles: 'Art. 16–17',
    color: '#F97316',
    lessons: [
      { id: 'l03-01', title: 'Live Ball vs Dead Ball',     duration: '16 min', status: 'available' },
      { id: 'l03-02', title: 'Status of the Ball',         duration: '22 min', status: 'locked'    },
      { id: 'l03-03', title: 'Ball in Backcourt',          duration: '14 min', status: 'locked'    },
    ],
    progress: 0, status: 'available',
  },
  {
    id: 'm04', number: 4,
    title: 'Violations',
    subtitle: 'Travelling, Dribbling, Time Rules & More',
    articles: 'Art. 24–31',
    color: '#EF4444',
    lessons: [
      { id: 'l04-01', title: 'Dribbling Rules',          duration: '20 min', status: 'locked' },
      { id: 'l04-02', title: 'Travelling',               duration: '25 min', status: 'locked' },
      { id: 'l04-03', title: '3-Second Rule',            duration: '15 min', status: 'locked' },
      { id: 'l04-04', title: '5, 8 & 24-Second Rules',  duration: '18 min', status: 'locked' },
      { id: 'l04-05', title: 'Shot Clock',               duration: '20 min', status: 'locked' },
    ],
    progress: 0, status: 'locked',
  },
  {
    id: 'm05', number: 5,
    title: 'Fouls',
    subtitle: 'Personal, Technical & Unsportsmanlike Fouls',
    articles: 'Art. 33–47',
    color: '#EC4899',
    lessons: [
      { id: 'l05-01', title: 'Contact Principles',      duration: '20 min', status: 'locked' },
      { id: 'l05-02', title: 'Personal Foul',           duration: '22 min', status: 'locked' },
      { id: 'l05-03', title: 'Unsportsmanlike Foul',    duration: '18 min', status: 'locked' },
      { id: 'l05-04', title: 'Technical Foul',          duration: '16 min', status: 'locked' },
      { id: 'l05-05', title: 'Foul Penalties',          duration: '20 min', status: 'locked' },
    ],
    progress: 0, status: 'locked',
  },
  {
    id: 'm06', number: 6,
    title: 'Free Throws & Throw-ins',
    subtitle: 'Restarting Play — Procedures & Details',
    articles: 'Art. 20–21',
    color: '#8B5CF6',
    lessons: [
      { id: 'l06-01', title: 'Throw-in Procedure',   duration: '18 min', status: 'locked' },
      { id: 'l06-02', title: 'Free Throw Procedure', duration: '20 min', status: 'locked' },
    ],
    progress: 0, status: 'locked',
  },
  {
    id: 'm07', number: 7,
    title: 'Shot Clock',
    subtitle: '24-Second and 14-Second Rules',
    articles: 'Art. 29',
    color: '#0EA5E9',
    lessons: [
      { id: 'l07-01', title: '24-Second Rule',       duration: '18 min', status: 'locked' },
      { id: 'l07-02', title: '14-Second Reset',      duration: '16 min', status: 'locked' },
      { id: 'l07-03', title: 'Shot Clock Operator',  duration: '14 min', status: 'locked' },
    ],
    progress: 0, status: 'locked',
  },
  {
    id: 'm10', number: 10,
    title: 'Officials & Mechanics',
    subtitle: 'Signals, Duties & Administration',
    articles: 'Art. 48–53',
    color: '#14B8A6',
    lessons: [
      { id: 'l10-01', title: 'Official Signals',         duration: '25 min', status: 'locked' },
      { id: 'l10-02', title: 'Game Clock Administration', duration: '15 min', status: 'locked' },
    ],
    progress: 0, status: 'locked',
  },
  {
    id: 'm11', number: 11,
    title: 'IOT',
    subtitle: 'Individual Officiating Techniques',
    articles: 'IOT Guide',
    color: '#F59E0B',
    lessons: [
      { id: 'l11-01', title: 'Officiating Principles',    duration: '30 min', status: 'locked' },
      { id: 'l11-02', title: 'Observation & Positioning', duration: '25 min', status: 'locked' },
      { id: 'l11-03', title: 'Decision Making',           duration: '20 min', status: 'locked' },
    ],
    progress: 0, status: 'locked',
  },
  {
    id: 'm12', number: 12,
    title: '3PO',
    subtitle: 'Three-Person Officiating',
    articles: '3PO Guide',
    color: '#10B981',
    lessons: [
      { id: 'l12-01', title: 'Lead, Center & Trail',            duration: '28 min', status: 'locked' },
      { id: 'l12-02', title: 'Primary Areas & Ball-Side / Help-Side', duration: '25 min', status: 'locked' },
      { id: 'l12-03', title: 'Rotation & Communication',         duration: '22 min', status: 'locked' },
    ],
    progress: 0, status: 'locked',
  },
]

// ────────────────────────────────────────────────
// QUIZ QUESTIONS
// ────────────────────────────────────────────────
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q01',
    type: 'multiple-choice',
    question: 'When does Team Control begin?',
    options: [
      'When a player of the team first touches the ball in a period',
      'When a player controls the ball by holding or dribbling it, or when the ball is at the disposal of a player',
      'Only after two consecutive passes between teammates',
      'When the official blows the whistle to restart play',
    ],
    correct: 1,
    explanation: 'Team Control begins when a player of the team is in control by holding or dribbling, the ball is being passed between players of the same team, or the ball is at the disposal of a player for a throw-in or free throw.',
    article: 'Art. 14.1',
    concept: 'teamControl',
  },
  {
    id: 'q02',
    type: 'scenario',
    question: 'What is the correct decision in this situation?',
    situation: 'Blue #7 catches a pass near the free throw line and begins dribbling. While dribbling, Blue #7 picks up the ball with both hands, then — after holding it for one second — starts to dribble again. White #5 does not make contact.',
    options: [
      'No violation — the player may resume the dribble after holding the ball briefly',
      'Travelling violation — Blue team loses possession',
      'Double dribble violation — White team is awarded a throw-in',
      'Held ball — jump ball between Blue #7 and White #5',
    ],
    correct: 2,
    explanation: 'This is a double dribble violation (Art. 24.1.3). A player who has completed a dribble by holding the ball with both hands may not begin another dribble. The ball is awarded to the opponent for a throw-in.',
    article: 'Art. 24.1.3',
    concept: 'dribbling',
  },
  {
    id: 'q03',
    type: 'true-false',
    question: 'Team Control ends when a player releases the ball on a shot for a field goal, regardless of whether the shot is successful.',
    options: ['True', 'False'],
    correct: 0,
    explanation: 'True. Team Control ends when the ball is released on a field goal attempt. During the time the ball is in flight, no team has control. Control may be re-established by either team upon gaining possession.',
    article: 'Art. 14.1',
    concept: 'teamControl',
  },
  {
    id: 'q04',
    type: 'multiple-choice',
    question: 'Blue #5 enters the opponents\' restricted area (paint) while Blue team is in control in the frontcourt. After 2 seconds, Blue #5 receives a pass. When does the 3-second count reset?',
    options: [
      'The count resets immediately when Blue #5 receives the pass',
      'The count does not reset — Blue #5 has 1 second remaining before a violation',
      'The count resets only if Blue #5 dribbles out of the restricted area',
      'The count never resets unless the team loses and regains control',
    ],
    correct: 1,
    explanation: 'The 3-second count does not reset when a player receives a pass. The count began when Blue #5 entered the restricted area. With 2 seconds already elapsed, Blue #5 has only 1 second remaining. The violation will be called if Blue #5 remains in the paint.',
    article: 'Art. 26.1',
    concept: 'threeSec',
  },
  {
    id: 'q05',
    type: 'scenario',
    question: 'What is the status of the ball in this situation?',
    situation: 'White #10 attempts a field goal. The ball strikes the rim and rebounds. Blue #4 and White #10 simultaneously grab the ball. The official signals a held ball.',
    options: [
      'The ball is live — players may try to gain individual possession',
      'The ball is dead — it became dead when both players simultaneously held it',
      'The ball remains live until the official\'s whistle sounds',
      'The ball is dead only after the official signals the alternating possession arrow',
    ],
    correct: 2,
    explanation: 'The ball remains live until the official blows the whistle. The official must observe the held ball situation and then blow the whistle to stop play. The ball becomes dead at the moment of the whistle, not at the moment of the held ball itself.',
    article: 'Art. 16.2.3',
    concept: 'statusBall',
  },
]

// ────────────────────────────────────────────────
// TEAM CONTROL LESSON SLIDES DATA
// ────────────────────────────────────────────────
export interface SlideData {
  type: string
  slideIndex: number
  [key: string]: any
}

export const teamControlSlides: SlideData[] = [
  {
    type: 'intro',
    slideIndex: 0,
    module: 'MODULE 02',
    lesson: 'LESSON 03',
    title: 'TEAM CONTROL',
    article: 'Art. 14',
    source: 'FIBA Official Basketball Rules 2024',
    objectives: [
      'Define Team Control according to FIBA rules',
      'Identify when Team Control begins and ends',
      'Connect Team Control to Status of the Ball',
      'Apply Team Control in game situations',
      'Recognise time violations that depend on Team Control',
    ],
  },
  {
    type: 'prerequisites',
    slideIndex: 1,
    title: 'BEFORE WE CONTINUE',
    subtitle: 'This lesson builds directly on concepts you have already studied.',
    prerequisites: [
      { id: 'players',       label: 'Players',        article: 'Art. 4',    mastery: 100, status: 'completed' },
      { id: 'teams',         label: 'Teams',          article: 'Art. 5–6',  mastery: 80,  status: 'completed' },
      { id: 'playerControl', label: 'Player Control', article: 'Art. 15',   mastery: 90,  status: 'completed' },
    ],
    message: 'All prerequisites are complete. Team Control is the next step in understanding ball status.',
    nextConcept: 'Status of the Ball',
  },
  {
    type: 'concept',
    slideIndex: 2,
    title: 'WHAT IS TEAM CONTROL?',
    subtitle: 'The simplest explanation first.',
    body: 'A team is in control of the ball when one of its players has control of the ball — by holding it, or dribbling it. Team Control also exists when the ball is being passed between players of the same team, or when the ball is waiting for a player to restart play.',
    visual: 'team-control-diagram',
  },
  {
    type: 'official',
    slideIndex: 3,
    article: 'Art. 14 — Team Control',
    source: 'FIBA Official Basketball Rules 2024',
    text: 'A team is in control of the ball when:\n\n• A player of the team is in control of the ball (player control)\n• The ball is being passed between players of the same team\n• The ball is at the disposal of a player of the team for a throw-in\n• The ball is at the disposal of a player of the team for a free throw',
    note: 'This is the exact wording from the official rulebook. The platform separates this from instructor explanations.',
  },
  {
    type: 'diagram',
    slideIndex: 4,
    title: 'WHEN DOES TEAM CONTROL BEGIN?',
    items: [
      { icon: '⬤', color: '#F97316', label: 'Player holds the ball', detail: 'The moment a player grabs or catches a live ball' },
      { icon: '⬤', color: '#F97316', label: 'Player begins to dribble', detail: 'From the first push of the dribble' },
      { icon: '⬤', color: '#F97316', label: 'Ball at disposal for throw-in', detail: 'When the official hands or bounces the ball to the player' },
      { icon: '⬤', color: '#F97316', label: 'Ball at disposal for free throw', detail: 'When the official hands the ball to the free throw shooter' },
    ],
  },
  {
    type: 'diagram',
    slideIndex: 5,
    title: 'WHEN DOES TEAM CONTROL END?',
    items: [
      { icon: '✕', color: '#EF4444', label: 'Opponent gains control', detail: 'The other team\'s player holds or dribbles the ball' },
      { icon: '✕', color: '#EF4444', label: 'Ball released on a shot', detail: 'From the instant the shooter releases the ball — even on a miss' },
      { icon: '✕', color: '#EF4444', label: 'Ball becomes dead', detail: 'A foul, violation, or official\'s whistle kills possession' },
    ],
  },
  {
    type: 'scenario',
    slideIndex: 6,
    title: 'ON-COURT SITUATION',
    situation: 'Blue #7 receives a pass near the free throw line. Blue #7 dribbles twice, then passes to Blue #12 cutting to the basket. White #5 reaches in and knocks the ball loose. The ball rolls out of bounds.',
    sequence: [
      { event: 'Blue #7 catches the pass',      control: 'BLUE',  detail: 'Player Control → Team Control begins' },
      { event: 'Blue #7 dribbles',              control: 'BLUE',  detail: 'Team Control continues during dribble' },
      { event: 'Ball in flight — pass',         control: 'BLUE',  detail: 'Team Control continues during passes' },
      { event: 'Blue #12 catches',              control: 'BLUE',  detail: 'Player Control → Team Control continues' },
      { event: 'White #5 knocks ball loose',    control: 'NONE',  detail: 'Loose ball — no Team Control' },
      { event: 'Ball goes out of bounds',       control: 'NONE',  detail: 'Dead ball — White team throw-in' },
    ],
    question: 'Which team had control when the ball went out of bounds?',
    answer: 'No team had control. The last player to touch the ball before it went out of bounds was White #5 — White team caused it to go out. Therefore, Blue team is awarded the throw-in.',
    rule: 'Art. 22.5',
  },
  {
    type: 'connection',
    slideIndex: 7,
    title: 'WHY TEAM CONTROL MATTERS',
    subtitle: 'These violations can only occur while a team is in control.',
    connections: [
      { label: '3-Second Violation',  article: 'Art. 26', detail: 'Team must have control in the frontcourt' },
      { label: '8-Second Violation',  article: 'Art. 30', detail: 'Team must advance ball to frontcourt within 8 sec' },
      { label: '24-Second Violation', article: 'Art. 29', detail: 'Team must attempt a shot within 24 seconds' },
      { label: 'Back-Court Violation',article: 'Art. 28', detail: 'Team in control may not return ball to backcourt' },
    ],
    nextLesson: 'Status of the Ball (Art. 16–17)',
    message: 'You now understand Team Control. This directly unlocks the next lesson: Status of the Ball.',
  },
  {
    type: 'quiz',
    slideIndex: 8,
    question: 'Which of the following situations does NOT result in Team Control ending?',
    options: [
      'A player releases the ball on a shot attempt',
      'The ball is passed between two players of the same team',
      'An opponent steals the ball and begins dribbling',
      'An official blows the whistle for a foul',
    ],
    correct: 1,
    explanation: 'Team Control is maintained while the ball is being passed between players of the same team. A pass between teammates does not end Team Control — it continues uninterrupted.',
    article: 'Art. 14.1',
  },
]
