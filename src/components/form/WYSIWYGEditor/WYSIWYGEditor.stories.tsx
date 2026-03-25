import type {Meta, StoryObj} from '@storybook/react-vite';
import {expect, fn, userEvent, within} from 'storybook/test';

import {withFormik} from '@/sb-decorators';

import WYSIWYGEditor from './WYSIWYGEditor';

export default {
  title: 'Internal API / Form / WYSIWYG Editor',
  component: WYSIWYGEditor,
  decorators: [withFormik],
  args: {
    name: 'wysiwyg_editor',
    label: 'WYSIWYG editor label',
  },
  parameters: {
    formik: {
      onSubmit: fn(),
      renderSubmitButton: true,
      initialValues: {
        wysiwyg_editor: '<p>Some <b>initial</b> content</p>',
      },
    },
  },
} satisfies Meta<typeof WYSIWYGEditor>;

type Story = StoryObj<typeof WYSIWYGEditor>;

export const Default: Story = {};

export const Interaction: Story = {
  play: async ({canvasElement, step, parameters}) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // The editor isn't a real HTML input element, so we need to use querySelector to
    // locate it.
    const editor = canvas.getByTestId('wysiwyg-editor');
    const editorContent = editor.querySelector('div[contenteditable]');

    expect(editorContent).toBeVisible();
    expect(editorContent).toContainHTML('<p style="">Some <strong>initial</strong> content</p>');

    // Place cursor at the end of the contenteditable element and press enter.
    await userEvent.click(editorContent!);
    await userEvent.keyboard('[enter]');

    await step('Adding headers', async () => {
      const headingControl = canvas.getByRole('button', {name: 'Heading'});

      // Open heading dialog
      await userEvent.click(headingControl);
      const headingDialog = within(await body.findByRole('dialog'));

      // Enter content using the different heading levels
      await userEvent.click(await headingDialog.findByRole('button', {name: 'Heading 2'}));
      await userEvent.keyboard('Heading 2[enter]');
      await userEvent.click(await headingDialog.findByRole('button', {name: 'Heading 3'}));
      await userEvent.keyboard('Heading 3[enter]');
      await userEvent.click(await headingDialog.findByRole('button', {name: 'Heading 4'}));
      await userEvent.keyboard('Heading 4[enter]');
      await userEvent.click(await headingDialog.findByRole('button', {name: 'Heading 5'}));
      await userEvent.keyboard('Heading 5[enter]');
      await userEvent.click(await headingDialog.findByRole('button', {name: 'Heading 6'}));
      await userEvent.keyboard('Heading 6[enter]');

      // Close heading dialog
      await userEvent.click(headingControl);

      // Check if all heading content were added
      expect(editorContent).toContainHTML('<h2 style="">Heading 2</h2>');
      expect(editorContent).toContainHTML('<h3 style="">Heading 3</h3>');
      expect(editorContent).toContainHTML('<h4 style="">Heading 4</h4>');
      expect(editorContent).toContainHTML('<h5 style="">Heading 5</h5>');
      expect(editorContent).toContainHTML('<h6 style="">Heading 6</h6>');
    });

    await step('Basic text styling', async () => {
      // Enter content using the different text styles
      const boldControl = canvas.getByRole('button', {name: 'Bold'});
      await userEvent.click(boldControl);
      await userEvent.keyboard('Bold text[enter]');

      const italicControl = canvas.getByRole('button', {name: 'Italic'});
      await userEvent.click(italicControl);
      await userEvent.keyboard('Italic text[enter]');

      const strikeControl = canvas.getByRole('button', {name: 'Strikethrough'});
      await userEvent.click(strikeControl);
      await userEvent.keyboard('Strikethrough text[enter]');

      const underlineControl = canvas.getByRole('button', {name: 'Underline'});
      await userEvent.click(underlineControl);
      await userEvent.keyboard('Underline text[enter]');

      // Check if all text styles were added
      expect(editorContent).toContainHTML('<p style=""><strong>Bold text</strong></p>');
      expect(editorContent).toContainHTML('<p style=""><em>Italic text</em></p>');
      expect(editorContent).toContainHTML('<p style=""><s>Strikethrough text</s></p>');
      expect(editorContent).toContainHTML('<p style=""><u>Underline text</u></p>');
    });

    await step('Adding lists', async () => {
      const listControl = canvas.getByRole('button', {name: 'List'});

      // Open list dialog
      await userEvent.click(listControl);
      const listDialog = within(await body.findByRole('dialog'));

      // Enter content using the different heading levels
      await userEvent.click(await listDialog.findByRole('button', {name: 'Bullet list'}));
      await userEvent.keyboard('Bullet list item[enter]');
      await userEvent.keyboard('Bullet list item[enter]');
      await userEvent.keyboard('Bullet list item[enter]');
      await userEvent.keyboard('[enter]');
      await userEvent.click(await listDialog.findByRole('button', {name: 'Ordered list'}));
      await userEvent.keyboard('Ordered list item[enter]');
      await userEvent.keyboard('Ordered list item[enter]');
      await userEvent.keyboard('Ordered list item[enter]');
      await userEvent.keyboard('[enter]');

      // Check if all list types were added
      expect(editorContent).toContainHTML(
        '<ul class="remirror-ul-list-content"><li><p style="">Bullet list item</p></li><li><p style="">Bullet list item</p></li><li><p style="">Bullet list item</p></li></ul>'
      );
      expect(editorContent).toContainHTML(
        '<ol><li><p style="">Ordered list item</p></li><li><p style="">Ordered list item</p></li><li><p style="">Ordered list item</p></li></ol>'
      );
    });

    await step('Submission', async () => {
      const submitButton = canvas.getByRole('button', {name: 'Submit'});
      await userEvent.click(submitButton);

      const expectedWysiwygContent =
        '<p style="">Some <strong>initial</strong> content</p>' +
        '<h2 style="">Heading 2</h2>' +
        '<h3 style="">Heading 3</h3>' +
        '<h4 style="">Heading 4</h4>' +
        '<h5 style="">Heading 5</h5>' +
        '<h6 style="">Heading 6</h6>' +
        '<p style=""><strong>Bold text</strong></p>' +
        '<p style=""><em>Italic text</em></p>' +
        '<p style=""><s>Strikethrough text</s></p>' +
        '<p style=""><u>Underline text</u></p>' +
        '<ul><li><p style="">Bullet list item</p></li><li><p style="">Bullet list item</p></li><li><p style="">Bullet list item</p></li></ul>' +
        '<ol><li><p style="">Ordered list item</p></li><li><p style="">Ordered list item</p></li><li><p style="">Ordered list item</p></li></ol>' +
        '<p style=""></p>';

      expect(parameters.formik.onSubmit).toHaveBeenCalledOnce();
      expect(parameters.formik.onSubmit).toHaveBeenCalledWith({
        wysiwyg_editor: expectedWysiwygContent,
      });
    });
  },
};
