import {P} from '@maykin-ui/admin-ui';

export interface DescriptionProps {
  id: string;
  children: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({id, children}) => (
  <P id={id} muted>
    {children}
  </P>
);

export default Description;
