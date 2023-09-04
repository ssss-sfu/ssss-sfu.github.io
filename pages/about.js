import { Hero, HeaderNav, Footer, Helmet } from "@components";
import HeroImage from "@images/about-page/about-hero-background.png";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ProfileCard } from "components/ProfileCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function About() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR("/api/staticdata", fetcher);

  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="about-page">
      <Helmet pageTitle={router.pathname} />
      <HeaderNav />
      <Hero
        title="Meet the Software Systems Student Society"
        subtitle="About"
        backgroundImage={HeroImage.src}
      />
      <main className="container">
        <section className="main-content">
          <h1>About the SSSS</h1>
          <p>
            Our mission is to represent students in the Software Systems Program
            at SFU.
          </p>
          <p>
            We help students by addressing Issues and Concerns between the
            students and faculty, building Community in and around our society,
            and sharing Resources provided by students and external
            organizations.
          </p>
          <p>
            Our voice has inflenced and improved our Education. Our reach
            extends to over 700 students, and our annual Hackathon has over 500
            registrations. We have funded conference fees, created Career
            Opportunities, and shared insights and materials to help students in
            their courses.
          </p>
        </section>
        <section className="current-exec">
          {data.current.map((profile) => (
            <ProfileCard profile={profile} key={profile.name}></ProfileCard>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
