export const PageId = {
  HOME: 'home',
  FORM_CATEGORIES: 'form-categories',
  FORM_OVERVIEW: 'form-overview',
  FORM_SUBMISSION_STATISTICS: 'form-submission-statistics',

  // Form detail pages
  FORM_DETAIL: 'form-detail',
  FORM_DETAIL_DESIGN: 'form-design',
  FORM_DETAIL_DESIGN_INTRODUCTION: 'form-design-introduction',
  FORM_DETAIL_DESIGN_START: 'form-design-start',
  FORM_DETAIL_DESIGN_FORM_STEPS: 'form-design-form-steps',
  FORM_DETAIL_DESIGN_CONFIRMATION: 'form-design-confirmation',
  FORM_DETAIL_LOGIC: 'form-logic',
  FORM_DETAIL_LOGIC_FORM_RULES: 'form-logic-form-rules',
  FORM_DETAIL_LOGIC_LIBRARY: 'form-logic-library',
  FORM_DETAIL_LOGIC_USER_VARIABLES: 'form-logic-user-variables',
  FORM_DETAIL_SETTINGS: 'form-settings',
  FORM_DETAIL_SETTINGS_GENERAL: 'form-settings-general',
  FORM_DETAIL_SETTINGS_AUTHENTICATION: 'form-settings-authentication',
  FORM_DETAIL_SETTINGS_AVAILABILITY: 'form-settings-availability',
  FORM_DETAIL_SETTINGS_PRESENTATION: 'form-settings-presentation',
  FORM_DETAIL_SETTINGS_PREFILL: 'form-settings-prefill',
  FORM_DETAIL_SETTINGS_VARIABLES: 'form-settings-variables',
  FORM_DETAIL_SETTINGS_REGISTRATION: 'form-settings-registration',
  FORM_DETAIL_SETTINGS_CONFIRMATION: 'form-settings-confirmation',
  FORM_DETAIL_SETTINGS_SUBMISSIONS: 'form-settings-submissions',
  FORM_DETAIL_SETTINGS_PAYMENT: 'form-settings-payment',
  FORM_DETAIL_SETTINGS_DATA_REMOVAL: 'form-settings-data-removal',
  FORM_DETAIL_SETTINGS_TRANSLATIONS: 'form-settings-translations',
  FORM_DETAIL_SETTINGS_HISTORY: 'form-settings-history',
} as const;

export type PageIdValue = (typeof PageId)[keyof typeof PageId];
