import type {AdminSettings} from '@/context/context';
import {getLoginUrl} from '@/utils/url';

export const redirect = {
  // Redirect to the default `/admin/login` screen
  toLogin: (djangoUrls: AdminSettings['djangoUrls'], nextUrl: string) => {
    window.location.assign(getLoginUrl(djangoUrls, nextUrl));
  },
};
