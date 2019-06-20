const storage = window.localStorage;
const KEYS = {
  USER_ID: 'user_id',
};

export function loadUserId() {
  return storage.getItem(KEYS.USER_ID);
}

export function saveUserId(value: string) {
  storage.setItem(KEYS.USER_ID, value);
}