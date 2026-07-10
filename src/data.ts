export type ProjectAccent = 'acid' | 'blue' | 'orange' | 'red'

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
    tech: ['TypeScript', 'Node.js', 'Redis', 'Disk'],
    href: 'https://github.com/flyingsquirrel0419/layercache',
    linkLabel: 'View repository',
    image: '/assets/projects/layercache-stampede.gif',
    imageAlt: 'layercache stampede prevention demonstration',
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
    tech: ['TypeScript', 'ESM', 'CJS', 'Zero deps'],
    href: 'https://github.com/flyingsquirrel0419/date-light',
    linkLabel: 'View repository',
    image: '/assets/projects/date-light-mark.svg',
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
    tech: ['Python', 'MCP', 'yt-dlp', 'Archives'],
    href: 'https://github.com/flyingsquirrel0419/unlimited-search',
    linkLabel: 'View repository',
    image: '/assets/projects/unlimited-search.png',
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
    tech: ['Rust', 'Anthropic API', 'OpenAI API', 'CLI'],
    href: 'https://github.com/flyingsquirrel0419/claude-occ',
    linkLabel: 'View repository',
    image: '/assets/projects/claude-occ.png',
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
    tech: ['Rust', 'Bytecode VM', 'Mark-sweep GC', 'test262'],
    href: 'https://github.com/flyingsquirrel0419/RuJa',
    linkLabel: 'View repository',
    image: '/assets/projects/ruja.png',
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
    tech: ['Discord.js', 'Shoukaku', 'Lavalink', 'Redis'],
    href: 'https://koreanbots.dev/bots/1419673280461148201',
    linkLabel: 'Open Iodine V2',
    image: '/assets/iodine.webp',
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
