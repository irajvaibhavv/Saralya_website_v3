import { useState } from 'react'
import { Band } from '../components/home/Band'
import { ForYou } from '../components/home/ForYou'
import { Hero } from '../components/home/Hero'
import { Journey } from '../components/home/Journey'
import { Marquee } from '../components/home/Marquee'
import { RunYourNumbers } from '../components/home/RunYourNumbers'
import { Upi } from '../components/home/Upi'
import { Cta } from '../components/layout/Cta'
import type { RoleId } from '../content/site'

export function Home() {
  const [role, setRole] = useState<RoleId>('ceo')
  return (
    <>
      <Hero role={role} onRole={setRole} />
      <Marquee />
      <Upi />
      <Journey />
      <ForYou role={role} onRole={setRole} />
      <RunYourNumbers />
      <Band />
      <Cta />
    </>
  )
}
