import {onResponseHook} from '@/guard/session/session-expiry';

/**
 * Wrapper around window.fetch that calls the onResponseHook. Should be used for all API
 * requests.
 */
const apiCall = async (url: string, opts?: RequestInit) => {
  const response = await window.fetch(url, opts);
  onResponseHook(response);
  return response;
};

export {apiCall};
