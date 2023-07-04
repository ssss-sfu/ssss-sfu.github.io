import { Helmet, HeaderNav, Footer } from "@components";
import { Dropdown } from "components/Dropdown.jsx";

export default function ResourcesPage() {
  return (
    <div className="resources-page">
      <Helmet />
      <HeaderNav />
      <main>
        <header className="container hero"></header>
        <article className="container"></article>
        <article className="container"></article>
      </main>
      <Footer />
    </div>
  );
}
