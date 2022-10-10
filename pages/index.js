import { Helmet } from '@components'
import HappySeb from '@images/seb/happy-seb-head.svg'

export default function LandingPage() {

  return (
    <div className='landing-page'>
      <Helmet />
      <main className='hero'>
        <p>Welcome to the</p>
        <h1>Software Systems Student Society</h1>
        <img src={HappySeb.src} alt='Happy Seb, the SSSS mascot' />
      </main>
    </div>
  )
}
