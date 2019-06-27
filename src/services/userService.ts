import Parse from 'services/parseService';

export async function signUp(contact: string, accountKitID: string) {
  try {
    const user = new Parse.User();
    user.set('username', contact);
    user.set('password', accountKitID);
    user.set('email', `${accountKitID}@grab-expo.com`);
    user.set('phone', contact);
    const result = await user.signUp();
    return result;
  } catch (error) {
    console.error(`[parseService.signUp]:`, error);
    return null;
  }
}

export async function logIn(contact: string, accountKitID: string) {
  try {
    const user = await Parse.User.logIn(contact, accountKitID);
    return user;
  } catch (error) {
    console.error(`[parseService.login]:`, error);
    return null;
  }
}

export async function getCurrentUser() {
  return Parse.User.currentAsync();
}
