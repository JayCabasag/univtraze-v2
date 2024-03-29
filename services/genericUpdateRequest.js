import axios from 'axios';
import { SERVER } from './configs';

export const genericUpdateRequest = async (url, data, token = null, method = 'PUT') => {
  try {
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url: `${SERVER}${url}`,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
const apiUrl = 'https://api.example.com/data/123';
const updatedData = { name: 'Updated Name' };
const authToken = 'your-auth-token';

genericUpdateRequest(apiUrl, updatedData, authToken)
  .then(data => {
    console.log('Updated Data:', data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
*/
