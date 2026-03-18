import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, userEvent, within} from 'storybook/test';

import {buildForm, mockFormDetailsGet, mockThemesGet} from '@/api-mocks';
import {withFormLayout} from '@/sb-decorators';

import PresentationPage from './Presentation';

export default {
  title: 'Pages / Form detail / Settings / Presentation',
  component: PresentationPage,
  decorators: [withFormLayout],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PresentationPage>;

type Story = StoryObj<typeof PresentationPage>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        mockFormDetailsGet(buildForm({theme: 'f01dc38e-3668-48fa-8963-b6b6e2a9ed6d'})),
        mockThemesGet(),
      ],
    },
  },
};

export const Interaction: Story = {
  parameters: {
    msw: {
      handlers: [
        mockFormDetailsGet(
          buildForm({theme: '', showProgressIndicator: false, showSummaryProgress: false})
        ),
        mockThemesGet(),
      ],
    },
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);

    const formButtonsPreview = within(await canvas.findByTestId('form-buttons-preview'));
    const theme = await canvas.findByRole('combobox');
    const nativeSelectForTheme = theme.querySelector<HTMLSelectElement>('select[hidden]')!;

    const showProgressIndicatorField = canvas.getByLabelText(
      'Show step progression next to the form'
    );
    const showSummaryProgressField = canvas.getByLabelText(
      'Show current step number and total amount of steps below the form title'
    );

    await step('Initial values', () => {
      // Initial values of inputs
      expect(nativeSelectForTheme.value).toBe('');
      expect(showProgressIndicatorField).not.toBeChecked();
      expect(showSummaryProgressField).not.toBeChecked();

      // Initial button literals
      const previewButtons = formButtonsPreview.getAllByRole('button');
      expect(previewButtons).toHaveLength(7);

      expect(previewButtons[0]).toHaveTextContent('Previous page');
      expect(previewButtons[1]).toHaveTextContent('Begin form');
      expect(previewButtons[2]).toHaveTextContent('Change');
      expect(previewButtons[3]).toHaveTextContent('Confirm');
      expect(previewButtons[4]).toHaveTextContent('Next');
      expect(previewButtons[5]).toHaveTextContent('Previous step');
      expect(previewButtons[6]).toHaveTextContent('Save current information');
    });

    await step('Entering values', async () => {
      // Select theme
      await userEvent.click(theme, {delay: 10});
      await userEvent.click(await within(theme).findByText('Light theme'), {
        delay: 10,
      });

      await userEvent.click(showProgressIndicatorField);
      await userEvent.click(showSummaryProgressField);
    });

    await step('Update button literals', async () => {
      await userEvent.click(canvas.getByRole('button', {name: 'Edit buttons'}));

      // The modal with the literals form is shown
      const literalsForm = await canvas.findByTestId('literals-form');
      expect(literalsForm).toBeVisible();

      const literalInputs = within(literalsForm).getAllByRole('textbox');
      expect(literalInputs).toHaveLength(7);

      // Edit all literals
      expect(literalInputs[0]).toHaveValue('Begin form');
      await userEvent.clear(literalInputs[0]);
      await userEvent.type(literalInputs[0], 'Start this form');

      expect(literalInputs[1]).toHaveValue('Previous page');
      await userEvent.clear(literalInputs[1]);
      await userEvent.type(literalInputs[1], 'Go to the previous page');

      expect(literalInputs[2]).toHaveValue('Change');
      await userEvent.clear(literalInputs[2]);
      await userEvent.type(literalInputs[2], 'Edit step data');

      expect(literalInputs[3]).toHaveValue('Confirm');
      await userEvent.clear(literalInputs[3]);
      await userEvent.type(literalInputs[3], 'Submit form');

      expect(literalInputs[4]).toHaveValue('Next');
      await userEvent.clear(literalInputs[4]);
      await userEvent.type(literalInputs[4], 'Go to the next step');

      expect(literalInputs[5]).toHaveValue('Previous step');
      await userEvent.clear(literalInputs[5]);
      await userEvent.type(literalInputs[5], 'Go to the previous step');

      expect(literalInputs[6]).toHaveValue('Save current information');
      await userEvent.clear(literalInputs[6]);
      await userEvent.type(literalInputs[6], 'Save step data');

      // Submit the literals form
      await userEvent.click(within(literalsForm).getByRole('button', {name: 'Save'}));

      // The modal with the literals form is no-longer shown
      expect(canvas.queryByTestId('literals-form')).not.toBeVisible();
    });

    await step('Validating values', async () => {
      // The category select has the value of the selected category uuid
      expect(nativeSelectForTheme.value).toBe('f01dc38e-3668-48fa-8963-b6b6e2a9ed6d');
      expect(showProgressIndicatorField).toBeChecked();
      expect(showSummaryProgressField).toBeChecked();

      // The button literals should have been updated
      const previewButtons = formButtonsPreview.getAllByRole('button');
      expect(previewButtons).toHaveLength(7);

      expect(previewButtons[0]).toHaveTextContent('Go to the previous page');
      expect(previewButtons[1]).toHaveTextContent('Start this form');
      expect(previewButtons[2]).toHaveTextContent('Edit step data');
      expect(previewButtons[3]).toHaveTextContent('Submit form');
      expect(previewButtons[4]).toHaveTextContent('Go to the next step');
      expect(previewButtons[5]).toHaveTextContent('Go to the previous step');
      expect(previewButtons[6]).toHaveTextContent('Save step data');
    });
  },
};
