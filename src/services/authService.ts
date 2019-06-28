import axios from 'axios';
import Guid from 'guid';
import { getCurrentUser, logIn, signUp } from './userService';

const FACEBOOK_APP_ID = '595211197675424';
const ACCOUNT_KIT_APP_SECRET = '53b50acccdc25259925febc9f18e9e2b';
const ACCOUNT_KIT_VERSION = 'v1.0';
const CSRF = Guid.raw();
const APP_ACCESS_TOKEN = ['AA', FACEBOOK_APP_ID, ACCOUNT_KIT_APP_SECRET].join(
  '|',
);

const authService = axios.create({
  baseURL: `https://graph.accountkit.com/${ACCOUNT_KIT_VERSION}`,
});

export async function authenticate() {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function initAccountKit() {
  window.AccountKit.init({
    appId: FACEBOOK_APP_ID,
    state: CSRF,
    version: ACCOUNT_KIT_VERSION,
  });
}

export async function loginByCode({ code, csrf }: LoginByCodeParams) {
  if (csrf !== CSRF) {
    throw Error('Wrong CSRF');
  }

  const {
    access_token: accountKitAccessToken,
    id: accountKitID,
  } = await getAccessToken(code);
  const { email, phone } = await getMe(accountKitAccessToken);
  const contact = email ? email.address : phone ? phone.number : '';
  return loginByContact({ emailOrPhone: contact, accountKitID });
}

export async function loginByContact({
  emailOrPhone,
  accountKitID,
}: LoginByContactParams) {
  const user =
    (await logIn(emailOrPhone, accountKitID)) ||
    (await signUp(emailOrPhone, accountKitID));
  return user;
}

async function getAccessToken(code: string) {
  const params = {
    grant_type: 'authorization_code',
    code: code,
    access_token: APP_ACCESS_TOKEN,
  };
  const { data } = await authService.get<AccessTokenResponse>('/access_token', {
    params,
  });
  console.log(data);
  return data;
}

async function getMe(accessToken: string) {
  // const appSecretProof = hashHmac256(ACCOUNT_KIT_APP_SECRET, accessToken);
  const params = {
    access_token: accessToken,
    // appsecret_proof: appSecretProof,
  };
  const { data } = await authService.get<MeResponse>('/me', { params });
  console.log(data);
  return data;
}

// async function hashHmac256(data: string, key: string) {
//   const encoder = new TextEncoder();
//   const cryptoKey = await crypto.subtle.importKey(
//     'raw',
//     encoder.encode(key),
//     { name: 'HMAC', hash: { name: 'SHA-256' } },
//     false,
//     ['sign', 'verify'],
//   );
//   const signature = await crypto.subtle.sign(
//     'HMAC',
//     cryptoKey,
//     encoder.encode(data),
//   );
//   const array = new Uint8Array(signature);
//   return Array.prototype.map
//     .call(array, s => `00${s.toString(16)}`.slice(-2))
//     .join('');
// }

export interface LoginByCodeParams {
  code: string;
  csrf: string;
}

interface AccessTokenResponse {
  access_token: string;
  expires_at: string;
  id: string;
}

interface MeResponse {
  phone?: { number: string };
  email?: { address: string };
}

interface LoginByContactParams {
  emailOrPhone: string;
  accountKitID: string;
}
