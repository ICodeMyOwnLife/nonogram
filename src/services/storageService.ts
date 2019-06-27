import { User } from 'parse';

const storage = window.localStorage;
const KEYS = {
  USER_ID: 'user_id',
  IS_LOGGED_IN: 'isLoggedIn',
  LOGIN_DATA: 'loginData',
};

export function markLogin() {
  storage.setItem(KEYS.IS_LOGGED_IN, 'true');
}

export function markLogout() {
  storage.removeItem(KEYS.IS_LOGGED_IN);
}

export function loadUserId() {
  return storage.getItem(KEYS.USER_ID);
}

export function saveUserId(value: string) {
  storage.setItem(KEYS.USER_ID, value);
}

export function saveUserData({ attributes, id }: User) {
  const userData: UserData = { id, sessionToken: attributes['sessionToken'] };
  storage.setItem(KEYS.LOGIN_DATA, JSON.stringify(userData));
}

export function loadLoginData() {
  const data = storage.getItem(KEYS.LOGIN_DATA);
  return data ? (JSON.parse(data) as UserData) : null;
}

export interface UserData {
  id: string;
  sessionToken: string;
}
