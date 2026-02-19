import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {IntlProvider} from 'react-intl';
import {createRoutesStub} from 'react-router';
import {waitFor} from 'storybook/test';
import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-react';

import {
  BASE_URL,
  buildForm,
  mockFormDetailsGet,
  mockFormDetailsGetFailure,
  mockFormDetailsPut,
  mockFormDetailsPutFailure,
  mswWorker,
} from '@/api-mocks';
import AdminSettingsProvider from '@/context/AdminSettingsProvider';
import {formLoader, getFormDetailsQueryKey, useFormMutation} from '@/queryClient/form';
import type {Form} from '@/types/form';

const AppWrapper: React.FC<React.PropsWithChildren> = ({children}) => (
  <AdminSettingsProvider apiBaseUrl={BASE_URL} environmentInfo={{label: 'of-dev', showBadge: true}}>
    <IntlProvider locale="en">{children}</IntlProvider>
  </AdminSettingsProvider>
);

const SimplePage: React.FC = () => <div>Test page</div>;

const QueryClientProviderWrapper: React.FC<React.PropsWithChildren<{client: QueryClient}>> = ({
  client,
  children,
}) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;

const PageWithFormMutation: React.FC<{
  testClient: QueryClient;
  formId: string;
  updatedFormDetails: Form;
}> = ({testClient, formId, updatedFormDetails}) => {
  const {mutate} = useFormMutation(testClient, formId);

  return (
    <div>
      Test page <button onClick={() => mutate(updatedFormDetails)}>mutate data</button>
    </div>
  );
};

describe('formLoader', () => {
  it('should return the fetched form details', async () => {
    const formDetails = buildForm();
    mswWorker.use(mockFormDetailsGet(formDetails));

    const testClient = new QueryClient();
    const result = await formLoader(testClient, 'e450890a-4166-410e-8d64-0a54ad30ba01');

    await expect(result).toEqual(formDetails);
  });

  it('should throw an 404 error when the api responses with 404', async () => {
    mswWorker.use(mockFormDetailsGetFailure());

    const testClient = new QueryClient();
    const result = formLoader(testClient, 'e450890a-4166-410e-8d64-0a54ad30ba01');

    await expect(result).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe('formLoader in router', () => {
  it('should trigger a 404 when failing to fetch form details', async () => {
    mswWorker.use(mockFormDetailsGetFailure());
    const testClient = new QueryClient();

    const Stub = createRoutesStub([
      {
        path: '/form-details/:formId',
        loader: ({params}) => formLoader(testClient, params.formId),
        Component: SimplePage,
      },
    ]);

    const {getByText} = await render(
      <AppWrapper>
        <Stub initialEntries={['/form-details/e450890a-4166-410e-8d64-0a54ad30ba01']} />
      </AppWrapper>
    );

    await expect.element(getByText('404')).toBeVisible();
  });
});

describe('useFormMutation', () => {
  it('should update the formDetails cache after successful PUT requests', async () => {
    const formDetails = buildForm();
    const updatedFormDetails = buildForm({name: 'Updated form name'});
    mswWorker.use(mockFormDetailsPut(updatedFormDetails));

    const formId = 'e450890a-4166-410e-8d64-0a54ad30ba01';

    // Set query client data
    const testClient = new QueryClient();
    testClient.setQueryData(getFormDetailsQueryKey(formId), formDetails);

    const {getByText} = await render(
      <QueryClientProviderWrapper client={testClient}>
        <PageWithFormMutation
          testClient={testClient}
          formId={formId}
          updatedFormDetails={updatedFormDetails}
        />
      </QueryClientProviderWrapper>
    );
    await getByText('mutate data').click();

    // Expect the form data to have been updated
    await waitFor(() =>
      expect(testClient.getQueryData(getFormDetailsQueryKey(formId))).toEqual(updatedFormDetails)
    );
  });

  it('should not update the formDetails cache after failing PUT requests', async () => {
    const formDetails = buildForm();
    const updatedFormDetails = buildForm({name: 'Updated form name'});
    mswWorker.use(mockFormDetailsPutFailure());

    const formId = 'e450890a-4166-410e-8d64-0a54ad30ba01';

    // Set query client data
    const testClient = new QueryClient();
    testClient.setQueryData(getFormDetailsQueryKey(formId), formDetails);

    const {getByText} = await render(
      <QueryClientProviderWrapper client={testClient}>
        <PageWithFormMutation
          testClient={testClient}
          formId={formId}
          updatedFormDetails={updatedFormDetails}
        />
      </QueryClientProviderWrapper>
    );

    await getByText('mutate data').click();

    // Expect the form data to not have been updated
    await expect(testClient.getQueryData(getFormDetailsQueryKey(formId))).toEqual(formDetails);
  });
});
