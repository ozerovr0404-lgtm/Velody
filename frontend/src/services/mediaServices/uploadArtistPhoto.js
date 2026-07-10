const uploadArtistPhoto = async (file) => {

  const formData = new FormData();

  formData.append("photo", file);

  const response = await fetch("http://localhost:3000/api/upload/photo", {
      method: "POST",
      credentials: "include",
      body: formData
    }
  );


  if (!response.ok) {
    throw new Error("Ошибка загрузки фото");
  }


  return await response.json();
};


export default uploadArtistPhoto;