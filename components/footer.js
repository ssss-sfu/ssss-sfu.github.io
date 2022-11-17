import Image from "next/image"

function Footer() {
  return (
    <div class="footer">
      <div class="main-footer-content">
        <div class="home-link">
          <div class="left-icon">
            <Image src="/sosy-logo.svg" height={36} width={36} />
          </div>
          <div>
            <h6>Software Systems</h6>
            <h5>Student Society</h5>
          </div>
        </div>

        <div class="office-address icon-container">
          <div class="gray-backdrop left-icon">
            <Image src="/icons/office-building.svg" height={48} width={48} />
          </div>
          <div class="address icon-right-content">
            <h4>Office Address</h4>
            <address>
              <strong>Software Systems Student Society</strong><br />
              13450 102 Ave Unit 250, <br></br>
              SUR 4016, Galleria 4<br></br>
              Surrey, BC V3T 0A3<br></br>
            </address>
          </div>
        </div>

        <div class="get-in-touch icon-container">
          <div class="gray-backdrop left-icon">
            <Image src="/icons/contact-us.svg" height={48} width={48} />
          </div>
          <div class="address icon-right-content">
            <h4>Get in Touch</h4>
            <address>
              ssss-exec@sfu.ca
            </address>
          </div>
        </div>

        <div class="footer-socials icon-contianer">
          <a href="https://www.facebook.com/ssss.sfu">
            <Image src="/social-media/facebook.svg" height={34} width={34} />
          </a>
          <a href="https://www.linkedin.com/company/ssss-sfu/">
            <Image src="/social-media/linkedin.svg" height={34} width={34} />
          </a>
          <a href="https://www.instagram.com/ssss.sfu/">
            <Image src="/social-media/instagram.svg" height={34} width={34} />
          </a>
          <a href="https://discord.gg/XZUd7amxPq">
            <Image src="/social-media/discord.svg" height={34} width={34} />
          </a>
        </div>
      </div>
      <div class="footer-code-graphic-container">
        <Image src="/code-snippet.svg" height={187} width={572} />
      </div>
    </div>
  )
}
export default Footer
