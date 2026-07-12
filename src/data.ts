export type ProjectAccent = 'acid' | 'blue' | 'orange' | 'red'

/** Night-glide accent tones, one per project family. */
export const accentHex: Record<ProjectAccent, string> = {
  acid: '#6ee7c7',
  blue: '#8ab6ff',
  orange: '#ffb054',
  red: '#ff7d9c',
}

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

export type Project = {
  id: string
  name: string
  category: string
  language: 'TypeScript' | 'Python' | 'Rust'
  year: string
  headline: string
  summary: string
  problem: string
  build: string
  proof: string
  signalLabel: string
  impactLine: string
  caseNotes: string[]
  tech: string[]
  href: string
  linkLabel: string
  image: string
  imageAlt: string
  imageFit?: 'cover' | 'contain'
  accent: ProjectAccent
}

export const projects: Project[] = [
  {
    id: 'layercache',
    name: 'layercache',
    category: 'Cache infrastructure',
    language: 'TypeScript',
    year: '2026',
    headline: 'One origin call, even when 100 requests miss at once.',
    summary:
      'A multi-layer cache for Node.js that coordinates Memory, Redis, and Disk behind one read-through API.',
    problem:
      'Concurrent cache misses can stampede databases and APIs while disconnected cache layers drift out of sync.',
    build:
      'Request coalescing, automatic backfill, tag invalidation, stale serving, generation tracking, and framework integrations.',
    proof: '26 GitHub stars · 601 passing tests · 100 misses → 1 origin call',
    signalLabel: 'Concurrency result',
    impactLine: '100 simultaneous misses, one origin call.',
    caseNotes: [
      'Coalesces concurrent reads around one in-flight origin request.',
      'Backfills Memory, Redis, and Disk while preserving invalidation semantics.',
      'Serves stale data and tracks generations so failure remains controlled.',
    ],
    tech: ['TypeScript', 'Node.js', 'Redis', 'Disk'],
    href: 'https://github.com/flyingsquirrel0419/layercache',
    linkLabel: 'View repository',
    image: asset('projects/layercache-stampede.gif'),
    imageAlt: 'layercache stampede prevention demonstration',
    imageFit: 'contain',
    accent: 'acid',
  },
  {
    id: 'date-light',
    name: 'date-light',
    category: 'Package design',
    language: 'TypeScript',
    year: '2026',
    headline: '39 date utilities in 3.11 KB, with nothing hiding underneath.',
    summary:
      'A zero-dependency, fully typed date utility package for the operations most applications actually ship.',
    problem:
      'Small applications often import a broad date library for a narrow set of format, parse, compare, and range helpers.',
    build:
      'Immutable date-fns-style APIs, ESM and CJS entrypoints, generated types, migration guides, and release size checks.',
    proof: '5.9× smaller than 20 comparable date-fns imports · 13 stars',
    signalLabel: 'Shipping surface',
    impactLine: '39 typed utilities in 3.11 KB, with zero dependencies.',
    caseNotes: [
      'Keeps the familiar immutable helper shape without importing a broad runtime.',
      'Ships ESM, CJS, and generated types from one tested source.',
      'Treats bundle size and migration clarity as release requirements.',
    ],
    tech: ['TypeScript', 'ESM', 'CJS', 'Zero deps'],
    href: 'https://github.com/flyingsquirrel0419/date-light',
    linkLabel: 'View repository',
    image: asset('projects/date-light-mark.svg'),
    imageAlt: 'date-light package mark',
    imageFit: 'contain',
    accent: 'blue',
  },
  {
    id: 'unlimited-search',
    name: 'unlimited-search',
    category: 'Agent infrastructure',
    language: 'Python',
    year: '2026',
    headline: 'Turn difficult public URLs into structured text an agent can use.',
    summary:
      'A Python CLI and MCP server that recovers usable public web content through a transparent fallback pipeline.',
    problem:
      'Direct requests often return client shells, incomplete metadata, or blocked responses instead of readable content.',
    build:
      'Public routes, browser-like identities, feed and metadata recovery, archive fallbacks, media extraction, and attempt traces.',
    proof: 'PyPI package · 4 MCP tools · regression-tested live URL set',
    signalLabel: 'Recovery pipeline',
    impactLine: 'One URL enters; structured content and an attempt trace leave.',
    caseNotes: [
      'Escalates through public routes, metadata, feeds, archives, and media extraction.',
      'Exposes four MCP tools as well as a direct Python CLI.',
      'Keeps an attempt trace so recovery behavior stays inspectable.',
    ],
    tech: ['Python', 'MCP', 'yt-dlp', 'Archives'],
    href: 'https://github.com/flyingsquirrel0419/unlimited-search',
    linkLabel: 'View repository',
    image: asset('projects/unlimited-search.png'),
    imageAlt: 'unlimited-search public web reading pipeline',
    imageFit: 'cover',
    accent: 'orange',
  },
  {
    id: 'claude-occ',
    name: 'claude-occ',
    category: 'AI gateway',
    language: 'Rust',
    year: '2026',
    headline: 'Route Claude Code through the provider you choose.',
    summary:
      'A local Rust gateway that connects Claude Code to Anthropic, OpenAI-compatible, Google, Azure, and local providers.',
    problem:
      'Claude Code speaks the Anthropic Messages API while useful model providers expose several incompatible surfaces.',
    build:
      'Streaming translation, model discovery, loopback token auth, provider configuration, a launcher shim, and one-command native mode.',
    proof: 'npm CLI · Rust 2024 · localhost-first gateway',
    signalLabel: 'Protocol boundary',
    impactLine: 'One local gateway across Anthropic and OpenAI-compatible providers.',
    caseNotes: [
      'Translates streaming message surfaces instead of hiding provider differences.',
      'Keeps credentials behind loopback token authentication.',
      'Packages the Rust gateway behind an npm launcher for a short install path.',
    ],
    tech: ['Rust', 'Anthropic API', 'OpenAI API', 'CLI'],
    href: 'https://github.com/flyingsquirrel0419/claude-occ',
    linkLabel: 'View repository',
    image: asset('projects/claude-occ.png'),
    imageAlt: 'claude-occ provider routing overview',
    imageFit: 'contain',
    accent: 'blue',
  },
  {
    id: 'ruja',
    name: 'RuJa',
    category: 'Language runtime',
    language: 'Rust',
    year: '2026',
    headline: 'Execute untrusted JavaScript without handing it the host process.',
    summary:
      'A sandboxed, embeddable JavaScript runtime with a custom bytecode compiler, virtual machine, and garbage collector.',
    problem:
      'Plugin scripts can hang, overflow, exhaust memory, or crash the application that invited them in.',
    build:
      'Fuel metering, heap and call-stack caps, linear-time regex, panic-audited VM paths, and zero unsafe Rust.',
    proof: '5,060 scoped test262 cases at 100% · 96k+ fuzz iterations',
    signalLabel: 'Runtime evidence',
    impactLine: '5,060 scoped test262 cases at 100%, plus 96k fuzz iterations.',
    caseNotes: [
      'Compiles JavaScript into custom bytecode executed by an embeddable VM.',
      'Bounds fuel, heap, call depth, and regular-expression work.',
      'Keeps the runtime in safe Rust and audits VM paths for panic behavior.',
    ],
    tech: ['Rust', 'Bytecode VM', 'Mark-sweep GC', 'test262'],
    href: 'https://github.com/flyingsquirrel0419/RuJa',
    linkLabel: 'View repository',
    image: asset('projects/ruja.png'),
    imageAlt: 'RuJa JavaScript runtime logo',
    imageFit: 'contain',
    accent: 'orange',
  },
  {
    id: 'iodine',
    name: 'Iodine V2',
    category: 'Production Discord bot',
    language: 'TypeScript',
    year: '2026',
    headline: 'A music bot built to keep the room playing.',
    summary:
      'Team WICKED’s Discord music bot, developed and operated with Ingwannu.',
    problem: 'Voice sessions and queues need to survive routine updates and process restarts.',
    build: 'Lavalink playback, Redis queue recovery, and multi-bot voice routing.',
    proof: 'Production project · public KoreanBots listing',
    signalLabel: 'Operational focus',
    impactLine: 'Queues recover across restarts while voice routing stays available.',
    caseNotes: [
      'Runs playback through Lavalink with Discord.js and Shoukaku.',
      'Persists queue state in Redis so routine restarts do not erase the room.',
      'Supports multi-bot voice routing for production operation.',
    ],
    tech: ['Discord.js', 'Shoukaku', 'Lavalink', 'Redis'],
    href: 'https://koreanbots.dev/bots/1419673280461148201',
    linkLabel: 'Open Iodine V2',
    image: asset('iodine.webp'),
    imageAlt: 'Iodine V2 Discord bot icon',
    imageFit: 'contain',
    accent: 'red',
  },
]

export const disciplines = [
  {
    index: '01',
    title: 'Runtime systems',
    description:
      'Caches, proxies, and virtual machines with explicit limits, failure modes, and recovery paths.',
  },
  {
    index: '02',
    title: 'Developer tools',
    description:
      'Small interfaces around hard infrastructure, packaged with documentation people can actually follow.',
  },
  {
    index: '03',
    title: 'Production operations',
    description:
      'Discord systems and services designed around persistence, observability, and routine change.',
  },
]
