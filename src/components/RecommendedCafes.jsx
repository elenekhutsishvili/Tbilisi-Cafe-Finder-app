
const sampleRecommendations = [
  {
    name: "Garden Brew",
    match_percentage: 94.44,
    explanations: [
      "Matches your preferred price range",
      "Within your preferred distance",
      "Offers Wi-Fi",
      "Offers a quiet atmosphere",
    ],
  },
  {
    name: "Study Bean",
    match_percentage: 77.78,
    explanations: [
      "Matches your preferred price range",
      "Offers Wi-Fi",
    ],
  },
  {
    name: "City Espresso",
    match_percentage: 50,
    explanations: [
      "Offers Wi-Fi",
      "Offers laptop-friendly seating",
    ],
  },
];

function RecommendedCafes({
  recommendations = sampleRecommendations,
}) {
  if (recommendations.length === 0) {
    return <p>No cafés match your selected preferences.</p>;
  }

  const sortedRecommendations = [...recommendations].sort(
    (a, b) =>
      (b.match_percentage ?? -1) - (a.match_percentage ?? -1)
  );

  return (
    <section>
      <h2>Recommended Cafés</h2>

      {sortedRecommendations.map((cafe, index) => (
        <article key={cafe.id ?? `${cafe.name}-${index}`}>
          <h3>{cafe.name}</h3>

          {cafe.match_percentage !== null &&
          cafe.match_percentage !== undefined ? (
            <p>{cafe.match_percentage}% match</p>
          ) : (
            <p>No personalized score available</p>
          )}

          {cafe.explanations?.length > 0 && (
            <ul>
              {cafe.explanations.map((explanation, i) => (
                <li key={i}>{explanation}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </section>
  );
}

export default RecommendedCafes;
