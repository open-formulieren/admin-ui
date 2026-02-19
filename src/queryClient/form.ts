import type {QueryClient} from '@tanstack/react-query';

import {BASE_URL} from '@/api-mocks';
import type {Form} from '@/types/form';

export const formLoader = (
  queryClient: QueryClient,
  formId?: string
): Promise<Form | undefined> => {
  return queryClient.ensureQueryData({
    queryKey: ['formDetails', formId],
    queryFn: () => fetch(`${BASE_URL}form/${formId}`).then(r => r.json()),
  });
};
