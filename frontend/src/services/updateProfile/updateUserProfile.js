const updateUserProfile = async (
  id, 
  payload
) => {
  const response = await fetch(`http://localhost:3000/profile/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка при обновлении информации!');
    }

    return data;
}

export default updateUserProfile;