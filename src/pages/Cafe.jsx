import { useEffect, useState } from "react";

import AmenityFilter from "../components/AmenityFilter";
import { getCafes } from "../services/cafeService";

function Cafe() {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadCafes() {
      setLoading(true);
      setError(null);

      try {
        const results = await getCafes(selectedAmenities);

        if (active) {
          setCafes(results);
        }
      } catch {
        if (active) {
          setError("Could not load cafés. Please try again.");
          setCafes([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadCafes();

    return () => {
      active = false;
    };
  }, [selectedAmenities]);

  return (
    <main className="page-content">
      <h1>Browse Cafés in Tbilisi</h1>

      <p>Discover cafés based on your preferences.</p>

      <AmenityFilter
        selectedAmenities={selectedAmenities}
        onChange={setSelectedAmenities}
      />

      {loading && (
        <p role="status">Loading cafés...</p>
      )}

      {error && (
        <p role="alert">{error}</p>
      )}

      {!loading && !error && (
        <section aria-label="Café results">
          <h2>Results ({cafes.length})</h2>

          {cafes.length === 0 ? (
            <p>No cafés match your selected amenities.</p>
          ) : (
            <div className="cafe-list">
              {cafes.map((cafe) => (
                <article
                  key={cafe.id}
                  className="cafe-card"
                >
                  <h3>{cafe.name}</h3>

                  <p>{cafe.neighborhood}</p>

                  <p>{cafe.description}</p>

                  <p>Price level: {cafe.price_level}</p>

                  <h4>Amenities</h4>

                  <ul>
                    {cafe.amenities.map((amenity) => (
                      <li key={amenity}>{amenity}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Cafe;