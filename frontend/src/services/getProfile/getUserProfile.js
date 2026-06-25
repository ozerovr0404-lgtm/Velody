const getUserProfile = async (id) => {
  const response = await fetch(`http://localhost:3000/actor/profile/${id}`);

  if (!response.ok) {
    throw new Error('Ошибка загрузки профиля!');
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export default getUserProfile;