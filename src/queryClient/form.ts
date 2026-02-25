import type {QueryClient} from '@tanstack/react-query';
import {useMutation} from '@tanstack/react-query';

import {BASE_URL} from '@/api-mocks';
import type {Form} from '@/types/form';

export const getFormDetailsQueryKey = (formId?: string) => ['formDetails', formId];

export const formLoader = (
  queryClient: QueryClient,
  formId?: string
): Promise<Form | undefined> => {
  return queryClient.ensureQueryData({
    queryKey: getFormDetailsQueryKey(formId),
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}form/${formId}`);
      if (response.ok) return response.json();

      if (response.status === 404) {
        throw new Response('Form not found', {status: 404, statusText: 'Not found'});
      }

      throw new Error('Failed to fetch form details');
    },
  });
};

export const useFormMutation = (queryClient: QueryClient, formId: string) => {
  return useMutation<Form, Error, Form, {previous?: Form}>({
    mutationFn: async newFormDetails => {
      const response = await fetch(`${BASE_URL}form/${formId}`, {
        method: 'PUT',
        body: JSON.stringify(newFormDetails),
      });

      if (response.ok) return response.json();

      throw new Error('Failed to update form details');
    },

    onSuccess: async response => {
      queryClient.setQueryData(getFormDetailsQueryKey(formId), response);
    },
  });
};
