import {onResponseHook} from '@/guard/session/session-expiry';

const apiCall = async (url: string, opts?: RequestInit) => {
  const response = await window.fetch(url, opts);
  onResponseHook(response);
  return response;
};

export {apiCall};
