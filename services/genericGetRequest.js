import axios from 'axios';
import { SERVER } from './configs';

export const genericGetRequest = async (url, token = null) => {
  try {
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(`${SERVER}${url}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
const apiUrl = 'https://api.example.com/data';
const authToken = 'your-auth-token';

genericGetRequest(apiUrl, authToken)
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
*/
