import Image from "next/image"
import { Button } from '@components/button'

function Header() {    
  return (        
      <div class="header">
        <div class="home-link">
          <Image src="/sosy-logo.svg" height={36} width={36} />
          <div>
            <h6>Software Systems</h6>
            <h5>Student Society</h5>
          </div> 
        </div> 

        <div class="pages">
          <a class="page-link">About</a>
          <a class="page-link">Events</a>
          <a class="page-link">Get Involved</a>
          <a class="page-link">Resources</a>
        </div>

        <div class="socials">
          <a href="https://www.facebook.com/ssss.sfu">
            <Image src="/social-media/facebook.svg" height={18} width={18} />
          </a>
          <a  href="https://www.linkedin.com/company/ssss-sfu/">
            <Image src="/social-media/linkedin.svg" height={18} width={18} />
          </a>
          <a href="https://www.instagram.com/ssss.sfu/">
            <Image src="/social-media/instagram.svg" height={18} width={18} />
          </a>
          <a href="https://discord.gg/XZUd7amxPq">
            <Image src="/social-media/discord.svg" height={18} width={18} />
          </a>
          <Button label='Contact Us'/>
        </div>
      </div>
  )
}
export default Header
