import axios from 'axios';
// import { loadUserId } from 'services/storageService';

const backendService = axios.create({
  headers: {
    // userId: loadUserId(),
    'X-Parse-Application-Id': 'nonogram',
  },
  baseURL: 'http://165.22.96.28:1337/nonogram/',
});

export default backendService;
