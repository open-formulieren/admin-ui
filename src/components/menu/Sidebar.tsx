import type {ToolbarProps} from '@maykin-ui/admin-ui';
import {H2, H3, Sidebar as MyknSidebar, Toolbar} from '@maykin-ui/admin-ui';
import {useMatches} from 'react-router';

import FormDetailLevelMenu from './FormDetailMenu';
import MainMenu from './MainMenu';

const getMenuComponent = (matches: ReturnType<typeof useMatches>) => {
  if (matches.some(match => match.id === 'form-detail')) {
    return FormDetailLevelMenu;
  }

  return MainMenu;
};

const Subtitle: React.FC = () => {
  const matches = useMatches();

  if (matches.some(match => match.id === 'form-detail')) {
    // @TODO get form name from formik state
    return <H3>Naam formulier</H3>;
  }
  return null;
};

const Sidebar: React.FC = () => {
  const matches = useMatches();

  const MenuComponent = getMenuComponent(matches);
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
        <Subtitle />
      </Toolbar>
      <MenuComponent {...menuProps} />
    </MyknSidebar>
  );
};

export default Sidebar;
