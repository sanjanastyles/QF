// import { loadStripe } from '@stripe/stripe-js';

// let stripePromise;
export async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
}
export async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}
// export function setCookie(name, value, expire) {
//   let cookieString;
//   if (expire) {
//     const expirationDate = new Date();
//     expirationDate.setDate(expirationDate.getDate() + 7);
//     cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/;`;
//   } else {
//     cookieString = `${name}=${value}; path=/;`;
//   }
//   document.cookie = cookieString;
// }
// export function getCookie(name) {
//   const cookies = document.cookie.split(';');
//   for (const cookie of cookies) {
//     const [cookieName, cookieValue] = cookie.trim().split('=');
//     if (cookieName === name) {
//       return decodeURIComponent(cookieValue);
//     }
//   }
//   return null;
// }
// export function deleteAllCookies() {
//   const cookies = document.cookie.split(';');

//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i];
//     const eqPos = cookie.indexOf('=');
//     const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//     document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
//   }
// }
// export const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
//   }
//   return stripePromise;
// };

// export function apiInfo() {
//   const apiPath =
//     process.env.NODE_ENV === 'production'
//       ? process.env.REACT_APP_PROD_API_PATH
//       : process.env.REACT_APP_DEV_API_PATH;
//   return apiPath;
// }