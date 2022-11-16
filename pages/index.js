import { Helmet, Button } from '@components'
import HappySeb from '@images/seb/happy-seb-head.svg'

export default function LandingPage() {

  return (
    <div className='landing-page'>
      <Helmet />
      <main>
        <header className="hero">
          <p>Welcome to the</p>
          <h1>Software Systems Student Society</h1>
          <img src={HappySeb.src} alt='Happy Seb, the SSSS mascot' />
        </header>
        <article className='container discover-ssss'>
          <header>
            <h2>Discover the SSSS</h2>
            <Button label='Learn more' type='secondary' />
          </header>
          <a className="discover-ssss__main-link-item">
            <h3>Learn About Software Systems</h3>
            <p>About Us</p>
          </a>
          <section className='discover-ssss__link-items'>
            <a className="discover-ssss__link-item">
              <h3>Events Calendar</h3>
              <p>Events</p>
            </a>
            <a className="discover-ssss__link-item">
              <h3>Committees</h3>
              <p>Get Involved</p>
            </a>
            <a className="discover-ssss__link-item">
              <h3>Meet the Exec Team</h3>
              <p>About Us</p>
            </a>
          </section>
        </article>
      </main>
    </div>
  )
}
