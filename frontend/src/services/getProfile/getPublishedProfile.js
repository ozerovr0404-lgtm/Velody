const getPublishedProfile = async (page, limit, filters = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  params.append("tab", filters.tab ?? "");

  if (filters.ratingFrom !== undefined)
    params.append("ratingFrom", filters.ratingFrom);

  if (filters.ratingTo !== undefined)
    params.append("ratingTo", filters.ratingTo);

  if (filters.experienceFrom !== undefined && filters.experienceFrom !== "")
    params.append("experienceFrom", filters.experienceFrom);

  if (filters.experienceTo !== undefined && filters.experienceTo !== "")
    params.append("experienceTo", filters.experienceTo);

  if (filters.priceFrom !== undefined && filters.priceFrom !== "")
    params.append("priceFrom", filters.priceFrom);

  if (filters.priceTo !== undefined && filters.priceTo !== "")
    params.append("priceTo", filters.priceTo);

  if (filters.likeOnly)
    params.append("likeOnly", "true");

  if (filters.genres?.length) {
    params.append("genres", JSON.stringify(filters.genres));
  }

  const url = `http://localhost:3000/catalog?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Ошибка при получении артистов!");
  }

  return await response.json();
};

export default getPublishedProfile;