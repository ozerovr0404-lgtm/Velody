console.log("🔥 SERVICE FILE LOADED NEW VERSION");
const getUserProfileForId = async (id) => {
  console.log("A");

  try {
    console.log("BEFORE FETCH CALL");

    const response = await fetch(
      `http://localhost:3000/actor/profile/${id}`,
      { method: "GET" }
    );

    console.log("after fetch");
    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log("PARSED:", data);
    console.log("after json");

    return data;
  } catch (err) {
    console.error("SERVICE ERROR:", err);
    throw err;
  } finally {
    console.log("FINALLY");
  }
};

export default getUserProfileForId;