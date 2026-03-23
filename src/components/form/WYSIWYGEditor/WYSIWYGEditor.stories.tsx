import type {Meta, StoryObj} from '@storybook/react-vite';

import WYSIWYGEditor from './WYSIWYGEditor';

export default {
  title: 'Internal API / Form / WYSIWYG Editor',
  component: WYSIWYGEditor,
  args: {
    name: 'wysiwyg_editor',
    label: 'WYSIWYG editor label',
  },
} satisfies Meta<typeof WYSIWYGEditor>;

type Story = StoryObj<typeof WYSIWYGEditor>;

export const Default: Story = {};
