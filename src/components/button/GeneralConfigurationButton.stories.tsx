import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, within} from 'storybook/test';

import GeneralConfigurationButton from './GeneralConfigurationButton';

export default {
  title: 'Internal API / Button / General Configuration Button',
  component: GeneralConfigurationButton,
} satisfies Meta<typeof GeneralConfigurationButton>;

type Story = StoryObj<typeof GeneralConfigurationButton>;

export const Default: Story = {
  parameters: {
    adminSettings: {
      djangoUrls: {
        generalConfiguration: 'http://localhost:8000/admin/config/globalconfiguration/',
      },
    },
  },
  play: ({canvasElement}) => {
    const canvas = within(canvasElement);

    const generalConfigurationButton = canvas.getByRole('link', {
      name: 'View general configuration',
    });

    // Expect the button to be shown and it uses djangoUrls.generalConfiguration url
    expect(generalConfigurationButton).toBeVisible();
    expect(generalConfigurationButton).toHaveAttribute(
      'href',
      'http://localhost:8000/admin/config/globalconfiguration/'
    );
  },
};
