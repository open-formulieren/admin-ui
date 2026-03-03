import './FieldDescription.scss';

const FieldDescription: React.FC<React.PropsWithChildren> = ({children}) => {
  return <div className="openforms-field-description">{children}</div>;
};

export default FieldDescription;
