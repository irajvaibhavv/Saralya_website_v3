import { Cta } from '../components/layout/Cta'
import { PageHero } from '../components/layout/PageHero'
import { MODULE_VISUALS } from '../components/products/ModuleVisuals'
import { FadeIn } from '../components/ui/Motion'
import { Container } from '../components/ui/Section'
import { MODULES } from '../content/site'

/* Six modules, alternating visual/text rows. Plug one in or run the stack. */
export function Products() {
  return (
    <>
      <PageHero eyebrow="Products" title={<>Six modules. <em>One tap each.</em></>} lede="Plug a single module into your existing core, or run the full stack.">
        <div className="mt-8 flex flex-wrap gap-2">
          {MODULES.map((m) => (
            <a key={m.code} href={`#${m.code}`} className="rounded-full border border-line2 bg-cream px-3.5 py-1.5 font-mono text-[11px] text-ink2 hover:border-ink">
              {m.code} · {m.name}
            </a>
          ))}
        </div>
      </PageHero>

      <Container className="space-y-8 pb-10 md:space-y-12">
        {MODULES.map((m, i) => {
          const Visual = MODULE_VISUALS[m.code]
          const flip = i % 2 === 1
          return (
            <FadeIn key={m.code}>
              <div id={m.code} className="grid scroll-mt-24 items-center gap-8 rounded-[32px] bg-cream/60 p-6 ring-1 ring-line md:p-10 lg:grid-cols-2 lg:gap-14">
                <div className={`mx-auto w-full max-w-[420px] ${flip ? 'lg:order-2' : ''}`}>
                  <Visual />
                </div>
                <div>
                  <div className="font-mono text-[12px] text-saffron">
                    {m.code} · {m.tag}
                  </div>
                  <h2 className="display mt-3 text-[clamp(32px,4.2vw,52px)]">{m.short}</h2>
                  <p className="mt-4 max-w-md text-[15.5px] text-muted">{m.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {m.points.map((p) => (
                      <span key={p} className="rounded-full bg-mint2 px-3 py-1.5 font-mono text-[11px] text-green">
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 font-display text-[18px] italic text-ink2">{m.name}</div>
                </div>
              </div>
            </FadeIn>
          )
        })}
      </Container>
      <Cta />
    </>
  )
}
