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

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = () => {
  return null;
};

export default WYSIWYGEditor;
