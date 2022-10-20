import Head from 'next/head'
import { Button } from '@components/button'
import Header from "../components/header.js";
import Footer from "../components/footer.js";

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Software Systems Student Society</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <h1>Software Systems Student Society</h1>
      <Button label='Primary button'/>
      <Button label='Secondary button' type='secondary'/>
      <Footer />
    </div>
  )
}
