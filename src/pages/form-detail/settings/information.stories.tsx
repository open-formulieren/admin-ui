import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, userEvent, within} from 'storybook/test';

import {buildForm, mockCategoriesGet, mockFormDetailsGet} from '@/api-mocks';
import {withFormLayout} from '@/sb-decorators';

import informationPage from './information';

export default {
  title: 'Pages / Form detail / Settings / Information',
  component: informationPage,
  decorators: [withFormLayout],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof informationPage>;

type Story = StoryObj<typeof informationPage>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [mockFormDetailsGet(), mockCategoriesGet()],
    },
  },
};

export const ManuallyEnterFields: Story = {
  parameters: {
    msw: {
      handlers: [
        mockFormDetailsGet(
          buildForm({
            name: '',
            internalName: '',
            slug: '',
          })
        ),
        mockCategoriesGet(),
      ],
    },
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);

    const category = await canvas.findByRole('combobox');
    const nativeSelectForCategory = category.querySelector<HTMLSelectElement>('select[hidden]')!;

    const internalNameField = canvas.getByLabelText('Internal name', {exact: false});
    const uuidField = canvas.getByLabelText('Unique ID');
    const slugField = canvas.getByLabelText('Slug', {exact: false});

    await step('Initial values', () => {
      expect(nativeSelectForCategory.value).toBe('');
      expect(internalNameField).toHaveValue('');
      expect(uuidField).toHaveValue('e450890a-4166-410e-8d64-0a54ad30ba01');
      expect(slugField).toHaveValue('');
    });

    await step('Entering values', async () => {
      // Select category
      await userEvent.click(category, {delay: 10});
      await userEvent.click(await within(category).findByText('Service realms > Housing'), {
        delay: 10,
      });

      // Set the internal name
      await userEvent.type(internalNameField, 'my form');
      await userEvent.tab();

      // Try to update the uuid
      await userEvent.type(uuidField, 'my custom uuid');
      await userEvent.tab();

      // Set the slug
      await userEvent.type(slugField, 'my-form');
      await userEvent.tab();
    });

    await step('Validating values', async () => {
      // The category select has the value of the selected category uuid
      expect(nativeSelectForCategory.value).toBe('5d1138ae-bb0c-42fe-bcba-f1e7ffc1e79e');
      expect(internalNameField).toHaveValue('my form');
      // uuid should not have been update
      expect(uuidField).toHaveValue('e450890a-4166-410e-8d64-0a54ad30ba01');
      // slug should be a kebab-case variant on the internal name
      expect(slugField).toHaveValue('my-form');
    });
  },
};
