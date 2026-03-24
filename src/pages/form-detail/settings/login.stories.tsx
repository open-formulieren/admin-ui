import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, userEvent, within} from 'storybook/test';

import {mockAuthenticationPluginsGet, mockFormDetailsGet} from '@/api-mocks';
import {withFormLayout} from '@/sb-decorators';

import LoginSettingsPage from './login';

export default {
  title: 'Pages / Form detail / Settings / Login',
  component: LoginSettingsPage,
  decorators: [withFormLayout],
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [mockFormDetailsGet(), mockAuthenticationPluginsGet()],
    },
  },
} satisfies Meta<typeof LoginSettingsPage>;

type Story = StoryObj<typeof LoginSettingsPage>;

export const Default: Story = {};

export const MostUsedMethods: Story = {
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);

    await step('Navigate to "Most used methodes" tab', async () => {
      const tab = await canvas.findByRole('tab', {name: 'Meest gebruikte methodes'});
      await userEvent.click(tab, {delay: 10});
    });

    await step('Most used method plugins are rendered', async () => {
      expect(canvas.getByLabelText('DigiD (biedt bsn aan)')).toBeVisible();
      expect(canvas.getByLabelText('DigiD via OpenID Connect (biedt bsn aan)')).toBeVisible();
      expect(canvas.getByLabelText('eHerkenning (biedt kvk aan)')).toBeVisible();
      expect(canvas.getByLabelText('eHerkenning via OpenID Connect (biedt kvk aan)')).toBeVisible();
    });
  },
};

export const OtherMethods: Story = {
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);

    await step('Navigate to "Overige methodes" tab', async () => {
      const tab = await canvas.findByRole('tab', {name: 'Overige methodes'});
      await userEvent.click(tab, {delay: 10});
    });

    await step('Other method plugins are rendered', async () => {
      expect(
        canvas.getByLabelText('DigiD Machtigen via OpenID Connect (biedt bsn aan)')
      ).toBeVisible();
      expect(
        canvas.getByLabelText('eHerkenning bewindvoering via OpenID Connect (biedt bsn aan)')
      ).toBeVisible();
      expect(canvas.getByLabelText('eIDAS (biedt pseudo aan)')).toBeVisible();
      expect(
        canvas.getByLabelText('Organization via OpenID Connect (biedt employee_id aan)')
      ).toBeVisible();
    });
  },
};

export const TestMethods: Story = {
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);

    await step('Navigate to "Test methodes" tab', async () => {
      const tab = await canvas.findByRole('tab', {name: 'Test methodes'});
      await userEvent.click(tab, {delay: 10});
    });

    await step('Test plugins are rendered', async () => {
      expect(canvas.getByLabelText('Demo Outage (biedt bsn aan)')).toBeInTheDocument();
      expect(canvas.getByLabelText('BSN Outage (biedt bsn aan)')).toBeInTheDocument();
      expect(canvas.getByLabelText('KvK Outage (biedt kvk aan)')).toBeInTheDocument();
      expect(canvas.getByLabelText('DigiD Mock (biedt bsn aan)')).toBeInTheDocument();
      expect(canvas.getByLabelText('Demo KvK number (biedt kvk aan)')).toBeInTheDocument();
    });
  },
};

export const TogglePlugin: Story = {
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);

    await step('Toggle plugins on the "Meest gebruikte methodes" tab', async () => {
      const digidToggle = await canvas.findByLabelText<HTMLInputElement>('DigiD (biedt bsn aan)');
      const eherkenningToggle = canvas.getByLabelText<HTMLInputElement>(
        'eHerkenning (biedt kvk aan)'
      );

      expect(digidToggle.checked).toBe(false);
      expect(eherkenningToggle.checked).toBe(false);

      await userEvent.click(digidToggle, {delay: 10});
      await userEvent.click(eherkenningToggle, {delay: 10});

      expect(digidToggle.checked).toBe(true);
      expect(eherkenningToggle.checked).toBe(true);
    });

    await step('Navigate to "Overige methodes" and toggle a plugin', async () => {
      await userEvent.click(canvas.getByRole('tab', {name: 'Overige methodes'}), {delay: 10});

      const eidasToggle = canvas.getByLabelText<HTMLInputElement>('eIDAS (biedt pseudo aan)');

      expect(eidasToggle.checked).toBe(false);

      await userEvent.click(eidasToggle, {delay: 10});

      expect(eidasToggle.checked).toBe(true);
    });

    await step('Navigate to "Test methodes" and toggle a plugin', async () => {
      await userEvent.click(canvas.getByRole('tab', {name: 'Test methodes'}), {delay: 10});

      const digidMockToggle = canvas.getByLabelText<HTMLInputElement>('DigiD Mock (biedt bsn aan)');

      expect(digidMockToggle.checked).toBe(false);

      await userEvent.click(digidMockToggle, {delay: 10});

      expect(digidMockToggle.checked).toBe(true);
    });

    await step(
      'Navigating back preserves the toggled state on "Meest gebruikte methodes"',
      async () => {
        await userEvent.click(canvas.getByRole('tab', {name: 'Meest gebruikte methodes'}), {
          delay: 10,
        });

        expect(canvas.getByLabelText<HTMLInputElement>('DigiD (biedt bsn aan)').checked).toBe(true);
        expect(canvas.getByLabelText<HTMLInputElement>('eHerkenning (biedt kvk aan)').checked).toBe(
          true
        );
      }
    );
  },
};
