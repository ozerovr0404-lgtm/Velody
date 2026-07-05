const addReviewByProfileId = async (id, payload) => {
  const response = await fetch(`http://localhost:3000/profile/${id}/reviews`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Не удалось добавить отзыв!');
  }

  const data = await response.json();

  return data;
}

export default addReviewByProfileId;