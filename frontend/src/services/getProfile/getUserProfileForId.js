const getUserProfileForId = async (id) => {

  try {
    const response = await fetch(
      `http://localhost:3000/profile/${id}`,
      { method: "GET" }
    );

    const data = await response.json();

    return data;
    
  } catch (err) {
    throw err;
  }
};

export default getUserProfileForId;