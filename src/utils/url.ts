import type {AdminSettings} from '@/context/context';

export const getLoginUrl = (djangoUrls: AdminSettings['djangoUrls'], nextUrl: string) => {
  const params = new URLSearchParams({next: nextUrl});
  return `${djangoUrls.adminLogin}?${params}`;
};
