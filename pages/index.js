import { Helmet } from '@components'

export default function LandingPage() {
  return (
    <div className='landing-page'>
      <Helmet />
      <main className='hero'>
        <p>Welcome to the</p>
        <h1>Software Systems Student Society</h1>
      </main>
    </div>
  )
}
