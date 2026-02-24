import type {ButtonProps} from '@maykin-ui/admin-ui';
import {Button} from '@maykin-ui/admin-ui';
import type {To} from 'react-router';
import {useNavigate} from 'react-router';

export interface NavItemProps {
  to: To;
  isActive?: boolean;
  buttonProps?: ButtonProps;
}

const NavItem: React.FC<React.PropsWithChildren<NavItemProps>> = ({
  to,
  isActive,
  children,
  buttonProps,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      key="back-to-forms-overview"
      {...buttonProps}
      align={buttonProps?.align || 'start'}
      // @TODO The active variant should be changed to 'accent'. Needs new admin-ui release
      variant={buttonProps?.variant || (isActive ? 'secondary' : 'transparent')}
      onClick={e => {
        e.preventDefault();
        navigate(to);
      }}
      size={buttonProps?.size || 'xs'}
    >
      {children}
    </Button>
  );
};

export default NavItem;
