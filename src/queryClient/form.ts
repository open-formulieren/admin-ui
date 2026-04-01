import type {QueryClient, UseBaseQueryOptions} from '@tanstack/react-query';
import {useMutation, useQuery} from '@tanstack/react-query';

import {useAdminSettings} from '@/hooks/useAdminSettings';
import type {Form, InternalForm} from '@/types/form';
import {apiCall} from '@/utils/fetch';

export const getFormDetailsQueryKey = (formId?: string) => ['formDetails', formId];

/**
 * Transforms a Form object to an InternalForm object.
 *
 * The InternalForm type includes properties that are used internally to make editing the
 * form data easier.
 */
export const formToInternalForm = (form: Form): InternalForm => ({
  ...form,
  _stepLiterals: form.steps.length
    ? form.steps[0].literals
    : {
        previous_text: '',
        next_text: '',
        save_text: '',
      },
});

/**
 * Transforms an InternalForm object to a Form object.
 *
 * The InternalForm type includes properties that should only be used internally,
 * like _stepLiterals. When persisting a form back to the backend, these properties
 * should not be included.
 */
const internalFormToForm = (internalForm: InternalForm): Form => {
  const stepLiterals = internalForm._stepLiterals;

  // The _stepLiterals data should be copied to the literals of each form step.
  if (stepLiterals) {
    internalForm.steps.forEach((_, index) => {
      internalForm.steps[index].literals = stepLiterals;
    });
  }

  // Make sure to delete the _stepLiterals property before returning the form
  delete internalForm._stepLiterals;
  return internalForm satisfies Form;
};

/**
 * Default options for fetching form details from queryClient cache, or from the backend.
 */
const formQueryOptions = (
  apiBaseUrl: string,
  formId?: string
): UseBaseQueryOptions<InternalForm> => ({
  queryKey: getFormDetailsQueryKey(formId),
  queryFn: async () => {
    const response = await apiCall(`${apiBaseUrl}form/${formId}`);
    if (response.ok) {
      const formData: Form = await response.json();
      return formToInternalForm(formData);
    }

    if (response.status === 404) {
      throw new Response('Form not found', {status: 404, statusText: 'Not found'});
    }

    throw new Error('Failed to fetch form details');
  },
});

/**
 * Custom React-router loader for fetching form details.
 *
 * Used to provide preloading on router-level. To fetch the form details, you should NOT
 * use the React-router useLoaderData hook, instead use the useFormQuery.
 *
 * The useLoaderData hook will return the initial data fetched by formLoader, while the
 * useFormQuery provides access to the updated queryClient cache.
 */
export const formLoader = async (
  apiBaseUrl: string,
  queryClient: QueryClient,
  formId?: string
): Promise<InternalForm | undefined> => {
  return await queryClient.ensureQueryData(formQueryOptions(apiBaseUrl, formId));
};

/**
 * Hook to fetch form details from the queryClient cache.
 */
export const useFormQuery = (
  queryClient: QueryClient,
  formId?: string
): InternalForm | undefined => {
  const {apiBaseUrls} = useAdminSettings();
  const {data} = useQuery(formQueryOptions(apiBaseUrls.v3, formId), queryClient);
  return data;
};

/**
 * Hook to update form details using a queryClient mutation.
 *
 * The mutationFn transforms the internal form data back to a server Form object before
 * performing the PUT request.
 *
 * On a successful PUT request, the response is transformed back to an internal form and
 * updated in the queryClient cache.
 */
export const useFormMutation = (queryClient: QueryClient, formId: string) => {
  const {apiBaseUrls} = useAdminSettings();
  return useMutation<Form, Error, InternalForm, {previous?: InternalForm}>({
    mutationFn: async newFormDetails => {
      // The backend expects a Form object, so we need to transform the internal form
      // back to a Form object.
      const backendForm = internalFormToForm(newFormDetails);
      const response = await apiCall(`${apiBaseUrls.v3}form/${formId}`, {
        method: 'PUT',
        body: JSON.stringify(backendForm),
      });

      if (response.ok) return response.json();

      throw new Error('Failed to update form details');
    },

    onSuccess: async response => {
      // After a successful PUT update, we need to transform the form back to an
      // internal form and update the query data in the query client.
      queryClient.setQueryData<InternalForm>(
        getFormDetailsQueryKey(formId),
        formToInternalForm(response)
      );
    },
  });
};
