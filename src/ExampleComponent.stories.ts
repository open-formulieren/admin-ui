import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, within} from 'storybook/test';

import ExampleComponent from '@/ExampleComponent';

export default {
  title: 'Internal API / Example Component',
  component: ExampleComponent,
} satisfies Meta<typeof ExampleComponent>;

type Story = StoryObj<typeof ExampleComponent>;

export const Default: Story = {
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const pageText = canvas.getByText('Hello World');
    expect(pageText).toBeVisible();
  },
};
