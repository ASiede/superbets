export const baseUrl = 'https://cors-anywhere.herokuapp.com/https://superbets-api.herokuapp.com';

export const registerUser = async (userData) => {
  console.log(userData);
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  console.log(response);
};
