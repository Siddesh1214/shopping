import axios from 'axios';

async function apiCall(url, method, data = null) {
  try {
    const response = await axios({
      url,
      method,
      data,
    });
    return response;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
}

export default apiCall;
