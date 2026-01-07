import type {StorybookConfig} from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-vitest', '@storybook/addon-docs', 'storybook-react-intl'],
  framework: '@storybook/react-vite',
};
export default config;
