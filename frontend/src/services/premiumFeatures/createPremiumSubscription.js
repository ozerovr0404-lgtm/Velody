const createPremiumSubscription = async (profileId) => {

  sessionStorage.setItem(
    "payment_return_url",
    window.location.pathname
  );

  const response = await fetch(
    "http://localhost:3000/payments/create",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artist_id: profileId
      })
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка создания платежа");
  }

  return await response.json();
};

export default createPremiumSubscription;