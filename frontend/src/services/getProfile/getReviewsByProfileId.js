const getReviewsByProfileId = async (id) => {
  const response = await fetch(`http://localhost:3000/profile/${id}/reviews`);

  if (!response.ok) {
    throw new Error('Ошибка при получении отзывов!');
  }

    const data = await response.json();

    return data.reviews;
}

export default getReviewsByProfileId;