import {ErrorMessage} from '@maykin-ui/admin-ui';
import {TableComponents, TableExtension} from '@remirror/extension-react-tables';
import {EditorComponent, Remirror, useRemirror} from '@remirror/react';
import {useField, useFormikContext} from 'formik';
import {prosemirrorNodeToHtml} from 'remirror';
import {
  BoldExtension,
  BulletListExtension,
  HardBreakExtension,
  HeadingExtension,
  HistoryExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  NodeFormattingExtension,
  OrderedListExtension,
  StrikeExtension,
  TextHighlightExtension,
  UnderlineExtension,
} from 'remirror/extensions';
import 'remirror/styles/all.css';

import FieldDescription from '@/components/form/FieldDescription';
import FormField from '@/components/form/FormField';
import Label from '@/components/form/Label';

import './WYSIWYGEditor.scss';
import WYSIWYGEditorToolbar from './WYSIWYGEditorToolbar';

export interface WYSIWYGEditorProps {
  /**
   * The name of the form field/input, used to set/track the field value in the form state.
   */
  name: string;
  /**
   * The (accessible) label for the field - anything that can be rendered.
   *
   * You must always provide a label to ensure the field is accessible to users of
   * assistive technologies.
   */
  label: React.ReactNode;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({name, label}) => {
  const {validateField} = useFormikContext();
  const [{value, onChange}, {error = '', touched}, {setTouched}] = useField(name);
  const invalid = touched && !!error;

  const {manager, state} = useRemirror({
    extensions: () => [
      new BoldExtension({}),
      new ItalicExtension(),
      new UnderlineExtension(),
      new StrikeExtension(),
      new HistoryExtension({}),
      new HeadingExtension({levels: [2, 3, 4, 5, 6]}),
      new BulletListExtension({enableSpine: true}),
      new OrderedListExtension(),
      new NodeFormattingExtension({}),
      new TextHighlightExtension({}),
      new TableExtension({resizable: true}),
      new LinkExtension({autoLink: true}),
      new ListItemExtension({}),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension(),
    ],
    content: value,
    selection: 'start',
    stringHandler: 'html',
  });

  return (
    <FormField>
      <FieldDescription>
        <Label>{label}</Label>

        {invalid && <ErrorMessage>{error}</ErrorMessage>}
      </FieldDescription>

      <div className="remirror-theme openforms-wysiwyg-editor" data-testid="wysiwyg-editor">
        <Remirror
          manager={manager}
          initialContent={state}
          onChange={e => {
            // Callback to update the Formik state
            onChange({
              target: {
                name,
                value: prosemirrorNodeToHtml(e.state.doc),
              },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          onBlur={async () => {
            // Need to manually set touched, as we cannot pass any Formik props to the
            // editor.
            await validateField(name);
            setTouched(true);
          }}
        >
          <WYSIWYGEditorToolbar />
          <EditorComponent />
          <TableComponents enableTableCellMenu={false} />
        </Remirror>
      </div>
    </FormField>
  );
};

export default WYSIWYGEditor;
