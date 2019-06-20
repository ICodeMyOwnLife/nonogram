let value = false;

export function authenticate() {
  return false;
}

export async function login(contact?: string) {
  value = !value;
  return {
    isAuthenticated: value,
  };
}
