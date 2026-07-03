export const logoutUser = async () => {
  const response = await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Logout failed!');
  }

  return response.json();
}