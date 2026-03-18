import type {Meta, StoryObj} from '@storybook/react-vite';

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
