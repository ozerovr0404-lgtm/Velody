const toggleFavorite = async (artistId) => {
  const response = await fetch(`http://localhost:3000/catalog/${artistId}/favorite`, {
    method: 'POST',
    credentials: 'include'
  });

  const data = await response.json();

  return data;
}

export default toggleFavorite;