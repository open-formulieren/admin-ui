import {getDefaultFactory} from '@/api-mocks/base';
import type {FormStep} from '@/types/form';

export const FORM_STEP_DEFAULTS: FormStep = {
  uuid: '9251a043-782e-41aa-b57d-e27aa129bb84',
  slug: 'step-1',
  index: 0,
  formDefinition: {},
  isApplicable: true,

  literals: {
    next_text: 'Next',
    previous_text: 'Previous step',
    save_text: 'Save current information',
  },
  translations: {},
};

/**
 * Return a form step object as if it would be returned from the form step detail API endpoint.
 * @param  overrides Key-value mapping with overrides from the defaults. These
 *                   are deep-assigned via lodash.set to the defaults, so use
 *                   '.'-joined strings as keys for deep paths.
 * @return            A form step detail object conforming to the FormStep proptype spec.
 */
export const buildFormStep = getDefaultFactory<FormStep>(FORM_STEP_DEFAULTS);
