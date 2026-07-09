export const getPremiumArtists = async () => {
  const response = await fetch('http://localhost:3000/catalog/premium');
  if (!response.ok) {
    throw new Error("Premium artists not found");
  }
  const data = await response.json();

  return data.artists;
}