/**
 * Type definition for form translations.
 */
export interface FormTranslation {
  language: 'nl' | 'en';
  name: string;
  description: string;
  introductionPageContent: string;
  confirmationPageTitle: string;
  confirmationPageContent: string;
  confirmationEmailTitle: string;
  confirmationEmailContent: string;
  confirmationCosignEmailTitle: string;
  confirmationCosignEmailContent: string;

  buttonLiterals: {
    begin: string;
    save: string;
    next: string;
    previous: string;
    change: string;
    confirm: string;
  };
}

/**
 * Type definition for a form authentication backend.
 */
export interface FormAuthenticationBackend {
  backend: string;
  options: Record<string, unknown>;
}

/**
 * Type definition for a variable used in a prefill plugin configuration.
 *
 * How the variables and prefill are configured is a major difference from the current
 * admin/backend. These types will probably change.
 */
export interface FormPrefillPluginVariable {
  variableKey: string;
  attribute?: string;
  prefill_identifier_role: 'main' | 'authorizee';
}

/**
 * Type definition for the prefill plugin configuration on a form.
 *
 * The form prefill config is a major difference from the current config.
 * These types will probably change.
 */
export interface FormPrefillPlugin {
  uuid: string;
  plugin: string;
  variables: FormPrefillPluginVariable[];
  options: Record<string, unknown>;
}

/**
 * Type definition for a form registration backend.
 */
export interface FormRegistrationBackend {
  key: string;
  name: string;
  backend: string;
  options: Record<string, unknown>;
}

/**
 * The FormLogic interface represents a single form logic rule.
 *
 * This definition will most definitely change in the future.
 */
export interface FormLogic {
  uuid: string;
  order: number;
  triggerFromStepId?: number;
  jsonLogicTrigger: Record<string, unknown>;
  actions: Record<string, unknown>[];
}

/**
 * Different types of form variables.
 */
export type FormVariableTypes =
  | 'string'
  | 'boolean'
  | 'object'
  | 'array'
  | 'int'
  | 'float'
  | 'datetime'
  | 'date'
  | 'time';

/**
 * The initial value types for each form variable type.
 */
export interface FormVariableInitialValueTypes {
  string: string;
  boolean: boolean;
  object: Record<string, unknown>;
  array: unknown[];
  int: number;
  float: number;
  datetime: string;
  date: string;
  time: string;
}

/**
 * Definition of a form variable.
 */
export interface FormVariable<T extends FormVariableTypes> {
  name: string;
  key: string;
  source: 'component' | 'user_defined';
  isSensitiveData: boolean;
  type: T;
  initialValue: FormVariableInitialValueTypes[T];
}

/**
 * The FormStep represents a single step in a form configuration.
 *
 * The FormStep interface is a mix of the backend FormStep and the FormDefinition objects.
 * The idea is to retrieve all form data using one endpoint, which is why this interface
 * is a mash-up.
 *
 * There is a good chance that this interface will change in the future.
 */
export interface FormStep {
  id: number;
  uuid: string;
  name: string;
  internalName: string;
  slug: string;
  order: number;
  configuration: Record<string, unknown>;
  loginRequired: boolean;
  isReusable: boolean;
  isApplicable: boolean;
}

/**
 * The Form interface contains all information needed to render the complete form
 * configuration.
 *
 * There is a good chance that this interface will change in the future.
 */
export interface Form {
  // uuid v4
  uuid: string;
  internalName: string;
  name: string;
  slug: string;
  category?: string;
  theme?: number;
  description: string;

  introductionPageContent: string;
  confirmationPageTitle: string;
  confirmationPageContent: string;
  confirmationEmailTitle: string;
  confirmationEmailContent: string;
  confirmationCosignEmailTitle: string;
  confirmationCosignEmailContent: string;

  buttonLiterals: {
    begin: string;
    save: string;
    next: string;
    previous: string;
    change: string;
    confirm: string;
  };

  suspensionAllowed: boolean;
  showProgressIndicator: boolean;
  showSummaryProgress: boolean;
  authenticationBackends: FormAuthenticationBackend[];
  autoLoginAuthenticationBackend?: string;
  steps: FormStep[];

  active: boolean;
  // Date string in ISO 8601 format
  activateOn?: string;
  // Date string in ISO 8601 format
  deactivateOn?: string;
  maintenanceMode: boolean;

  confirmation: {
    sendConfirmationEmail: boolean;
    showMainWebsiteLink: boolean;
    includeContentInPdf: boolean;

    useGlobalConfirmationPageSettings: boolean;
    useGlobalConfirmationEmailSettings: boolean;
    useGlobalConfirmationCosignEmailSettings: boolean;
  };

  askPrivacyConsent: 'global_setting' | 'required' | 'disabled';
  askStatementOfTruth: 'global_setting' | 'required' | 'disabled';
  submissionAllowed: 'yes' | 'no_with_overview' | 'no_without_overview';

  submissionCounter: number;
  submissionLimit?: number;

  productId?: number;
  paymentBackend?: string;
  paymentBackendOptions?: Record<string, unknown>;
  priceVariableKey?: string;

  allSubmissionsRemovalLimit?: number;
  erroredSubmissionsRemovalLimit?: number;
  erroredSubmissionsRemovalMethod?: 'delete_permanently' | 'make_anonymous';
  incompleteSubmissionsRemovalLimit?: number;
  incompleteSubmissionsRemovalMethod?: 'delete_permanently' | 'make_anonymous';
  successfulSubmissionsRemovalLimit?: number;
  successfulSubmissionsRemovalMethod?: 'delete_permanently' | 'make_anonymous';

  prefillPlugins: FormPrefillPlugin[];
  registrationBackends: FormRegistrationBackend[];

  logic: FormLogic[];
  variables: FormVariable<FormVariableTypes>[];
  translations: FormTranslation[];
}
