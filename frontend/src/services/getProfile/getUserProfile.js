const getUserProfile = async (id) => {
  console.log("service called", id);

  const response = await fetch(`http://localhost:3000/actor/profile/${id}`);
  
  console.log("response received", response);

  if (!response.ok) {
    console.log("bad response", response.status);
    throw new Error('Ошибка загрузки профиля!');
  }

  const data = await response.json();
  console.log("service DataTransfer", data);
  return data;
}

export default getUserProfile;