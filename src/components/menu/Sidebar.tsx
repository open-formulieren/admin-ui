import type {ToolbarProps} from '@maykin-ui/admin-ui';
import {H2, Sidebar as MyknSidebar, Toolbar} from '@maykin-ui/admin-ui';
import {useMatches} from 'react-router';

import {PageId} from '@/routes/constants';

import FormDetailMenu from './FormDetailMenu';
import MainMenu from './MainMenu';
import {FormDetailSubtitle} from './Subtitle';

const SidebarMenu: React.FC<{isFormDetail: boolean} & ToolbarProps> = ({
  isFormDetail,
  ...menuProps
}) => {
  if (isFormDetail) {
    return <FormDetailMenu {...menuProps} />;
  }

  return <MainMenu {...menuProps} />;
};

const Sidebar: React.FC = () => {
  const matches = useMatches();
  const isFormDetail = matches.some(match => match.id === PageId.FORM_DETAIL);
  const menuProps: ToolbarProps = {
    align: 'space-between',
    direction: 'v',
    variant: 'transparent',
    pad: true,
  };

  return (
    <MyknSidebar expandable={true}>
      <Toolbar {...menuProps} compact>
        <H2>Open Formulieren</H2>
        {isFormDetail && <FormDetailSubtitle />}
      </Toolbar>
      <SidebarMenu isFormDetail={isFormDetail} {...menuProps} />
    </MyknSidebar>
  );
};

export default Sidebar;
