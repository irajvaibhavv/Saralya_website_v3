import { INTEGRATIONS } from '../../content/site'

/* Rails, bureaus and cores Saralya plugs into — one continuous ticker. */
export function Marquee() {
  const items = [...INTEGRATIONS, ...INTEGRATIONS]
  return (
    <div className="border-y border-line py-5">
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-5 md:px-8">
        <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-hint">Plugs into</span>
        <div className="mask-fade-x flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-[20px] text-ink2/80 [&:hover]:[animation-play-state:paused]">
            {items.map((n, i) => (
              <span key={i} className="flex items-center gap-10">
                {n}
                <span className="size-1 rounded-full bg-saffron" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
