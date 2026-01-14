import {Body, CardBaseTemplate, Column, Logo, Outline, Toolbar} from '@maykin-ui/admin-ui';
import '@maykin-ui/admin-ui/style';
import {Outlet} from 'react-router';

import {useBreadcrumbItems} from '@/hooks/useBreadcrumbItems';

const BasicLayout = () => {
  const breadcrumbItems = useBreadcrumbItems();
  return (
    <CardBaseTemplate
      breadcrumbItems={breadcrumbItems}
      primaryNavigationItems={[
        <Logo key="Logo" abbreviated />,
        'spacer',
        {
          title: 'Uitloggen',
          children: <Outline.ArrowRightOnRectangleIcon />,
        },
        {
          title: 'Help',
          children: <Outline.QuestionMarkCircleIcon />,
        },
      ]}
      sidebarItems={[
        {
          align: 'start',
          active: true,
          variant: 'primary',
          children: (
            <>
              <Outline.PencilSquareIcon />
              Menu item 1
            </>
          ),
        },
        {
          align: 'start',
          variant: 'transparent',
          children: (
            <>
              <Outline.ShareIcon />
              Menu item 2
            </>
          ),
        },
        {
          align: 'start',
          variant: 'transparent',
          children: (
            <>
              <Outline.Cog6ToothIcon />
              Menu item 3
            </>
          ),
        },
      ]}
    >
      <Body fullHeight>
        <Outlet />
      </Body>
      <Column direction="row" span={12}>
        <Toolbar
          pad
          variant="alt"
          align="start"
          items={[
            {
              variant: 'primary',
              children: (
                <>
                  <Outline.BookmarkSquareIcon />
                  Action 1
                </>
              ),
            },
            {
              variant: 'secondary',
              children: (
                <>
                  <Outline.EyeIcon />
                  Action 2
                </>
              ),
            },
          ]}
        />
      </Column>
    </CardBaseTemplate>
  );
};

export default BasicLayout;
