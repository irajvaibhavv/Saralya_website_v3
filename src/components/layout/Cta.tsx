import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Motion'
import { Container } from '../ui/Section'

/* Deep-green closing block on every page. */
export function Cta() {
  return (
    <Container className="py-20 md:py-28">
      <FadeIn className="relative overflow-hidden rounded-[32px] bg-green px-6 py-16 text-paper md:px-14 md:py-24">
        <div aria-hidden className="absolute -right-24 -top-24 size-[420px] rounded-full border-[40px] border-green3/40" />
        <div aria-hidden className="absolute -bottom-32 left-1/3 size-[360px] rounded-full bg-[radial-gradient(circle,rgba(233,113,28,0.35),transparent_65%)]" />
        <div className="relative max-w-2xl">
          <div className="eyebrow mb-4 text-mint">Talk to the founders</div>
          <h2 className="display text-[clamp(36px,5.5vw,64px)]">
            See your book decided <em className="font-light text-saffron2">in minutes.</em>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/demo" variant="saffron" size="lg" arrow>
              Try a live decision
            </ButtonLink>
            <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Saralya%20demo`} variant="paper" size="lg">
              Book a walkthrough
            </ButtonLink>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
