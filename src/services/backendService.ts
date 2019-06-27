import axios from 'axios';
import { APP_BASE_URL } from 'constants/url';
const backendService = axios.create({
  headers: {
    // userId: loadUserId(),
    'X-Parse-Application-Id': 'nonogram',
  },
  baseURL: APP_BASE_URL,
});

export default backendService;
