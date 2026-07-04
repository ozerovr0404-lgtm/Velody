export const registerUser = async (stage_name, email, password, phone) => {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stage_name, email, password, phone })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Ошибка регистрации!');
  }

  return data;
}