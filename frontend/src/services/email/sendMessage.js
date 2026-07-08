const sendMessage = async ({recipientId, message}) => {
  const response = await fetch('http://localhost:3000/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      recipientId,
      message
    })
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || 'Ошибка отправки сообщения');
  }

  return data;
}

export default sendMessage;