import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function Home() {

    return(
        <div>
            <main className="home-page">
                <section className="hero-section" id="home">
                    <h3>Welcome to Tbilisi Café Finder</h3>

                    <p>
                        Find cafés in Tbilisi that match your preferences.
                    </p>

                    <button>Explore Cafés</button>
                </section>
            </main>


        </div>
    );

}

export default Home