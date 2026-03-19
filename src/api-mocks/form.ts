import type {Mock} from '@vitest/spy';
import {HttpResponse, http} from 'msw';

import type {Form} from '@/types/form';

import {BASE_URL, getDefaultFactory} from './base';

export const FORM_DEFAULTS: Form = {
  uuid: 'e450890a-4166-410e-8d64-0a54ad30ba01',
  internalName: 'Mock form',
  name: 'Mock form',
  slug: 'mock',
  category: undefined,
  theme: undefined,
  description: '',

  introductionPageContent: '',
  confirmationPageTitle: '',
  confirmationPageContent: '',
  confirmationEmailTitle: '',
  confirmationEmailContent: '',
  confirmationCosignEmailTitle: '',
  confirmationCosignEmailContent: '',

  literals: {
    previous_text: 'Previous page',
    begin_text: 'Begin form',
    change_text: 'Change',
    confirm_text: 'Confirm',
  },

  suspensionAllowed: true,
  showProgressIndicator: true,
  showSummaryProgress: true,
  authenticationBackends: [],
  autoLoginAuthenticationBackend: undefined,
  steps: [
    {
      id: 0,
      uuid: '493eb3ba-c674-4afb-9a37-569e373eec11',

      name: 'First step',
      internalName: 'First step',
      slug: 'first-step',
      order: 0,

      literals: {
        next_text: 'Next',
        previous_text: 'Previous step',
        save_text: 'Save current information',
      },

      configuration: {},
      isApplicable: true,
      isReusable: false,
      loginRequired: false,
    },
  ],

  active: true,
  // Date string in ISO 8601 format
  activateOn: undefined,
  // Date string in ISO 8601 format
  deactivateOn: undefined,
  maintenanceMode: false,

  confirmation: {
    sendConfirmationEmail: true,
    showMainWebsiteLink: true,
    includeContentInPdf: true,

    useGlobalConfirmationPageSettings: true,
    useGlobalConfirmationEmailSettings: true,
    useGlobalConfirmationCosignEmailSettings: true,
  },

  askPrivacyConsent: 'global_setting',
  askStatementOfTruth: 'global_setting',
  submissionAllowed: 'yes',

  submissionCounter: 0,
  submissionLimit: undefined,

  productId: undefined,
  paymentBackend: undefined,
  paymentBackendOptions: undefined,
  priceVariableKey: undefined,

  allSubmissionsRemovalLimit: undefined,
  erroredSubmissionsRemovalLimit: undefined,
  erroredSubmissionsRemovalMethod: undefined,
  incompleteSubmissionsRemovalLimit: undefined,
  incompleteSubmissionsRemovalMethod: undefined,
  successfulSubmissionsRemovalLimit: undefined,
  successfulSubmissionsRemovalMethod: undefined,

  prefillPlugins: [],
  registrationBackends: [],

  logic: [],
  variables: [],
  translations: [],
};

/**
 * Return a form object as if it would be returned from the form detail API endpoint.
 * @param  overrides Key-value mapping with overrides from the defaults. These
 *                   are deep-assigned via lodash.set to the defaults, so use
 *                   '.'-joined strings as keys for deep paths.
 * @return            A form detail object conforming to the Form proptype spec.
 */
export const buildForm = getDefaultFactory<Form>(FORM_DEFAULTS);

export const mockFormDetailsGet = (formDetail = buildForm(), spy?: Mock) =>
  http.get(
    `${BASE_URL}form/:uuid`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(formDetail, {
        // @TODO add expiry header
        status: 200,
      });
    },
    {once: false}
  );

export const mockFormDetailsGetFailure = (spy?: Mock) =>
  http.get(
    `${BASE_URL}form/:uuid`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(undefined, {
        // @TODO add expiry header
        status: 404,
      });
    },
    {once: false}
  );

export const mockFormDetailsPut = (formDetail = buildForm(), spy?: Mock) =>
  http.put(
    `${BASE_URL}form/:uuid`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(formDetail, {
        // @TODO add expiry header
        status: 200,
      });
    },
    {once: false}
  );

export const mockFormDetailsPutFailure = (spy?: Mock) =>
  http.put(
    `${BASE_URL}form/:uuid`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(undefined, {
        // @TODO add expiry header
        status: 404,
      });
    },
    {once: false}
  );
