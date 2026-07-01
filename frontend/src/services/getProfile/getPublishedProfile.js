const getPublishedProfile = async (page, limit) => {
  const response = await fetch(`http://localhost:3000/catalog?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Ошибка при получении артистов!');
  }

  const data = await response.json();

  console.log(data);
  
  return data;
}

export default getPublishedProfile;
