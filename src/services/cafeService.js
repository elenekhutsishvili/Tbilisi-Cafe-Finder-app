const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getCafes(selectedAmenities = []) {
  const params = new URLSearchParams();

  if (selectedAmenities.length > 0) {
    params.set("amenities", selectedAmenities.join(","));
  }

  const queryString = params.toString();

  const url = `${API_BASE_URL}/cafes/${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch cafés");
  }

  const data = await response.json();

  if (!Array.isArray(data.results)) {
    throw new Error("Invalid café data received");
  }

  return data.results.map((cafe) => ({
    ...cafe,
    id: cafe.cafe_id,
    latitude: Number(cafe.latitude),
    longitude: Number(cafe.longitude),
  }));
}

export async function getCafesForMap() {
  return getCafes();
}