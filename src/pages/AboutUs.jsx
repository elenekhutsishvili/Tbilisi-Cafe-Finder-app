import { Link } from "react-router";

function AboutUs() {

    return (
        <main className="about-page">
      <section className="about-intro">
        <h1>About Us</h1>

        <p>
          Tbilisi Café Finder helps you discover cafés in Tbilisi that match
          your preferences, location, budget, and lifestyle.
        </p>
      </section>

      <section className="about-features">
        <div className="about-card">
          <h2>Discover</h2>
          <p>
            Explore cafés throughout Tbilisi and find places that suit you.
          </p>
        </div>

        <div className="about-card">
          <h2>Personalize</h2>
          <p>
            Choose your preferred price range, distance, atmosphere, and café
            features.
          </p>
        </div>

        <div className="about-card">
          <h2>Save</h2>
          <p>
            Keep your favourite cafés in one place and return to them later.
          </p>
        </div>
      </section>

      <section className="about-purpose">
        <h2>Our purpose</h2>

        <p>
          Our goal is to make finding a suitable café in Tbilisi easier,
          faster, and more personalized.
        </p>
      </section>
    </main>
    )
}

export default AboutUs;