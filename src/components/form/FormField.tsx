import './FormField.scss';

const FormField: React.FC<React.PropsWithChildren> = ({children}) => {
  return <div className="openforms-form-field">{children}</div>;
};

export default FormField;
