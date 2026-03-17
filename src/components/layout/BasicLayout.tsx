import {
  Body,
  Breadcrumbs,
  CardBaseTemplate,
  Column,
  Logo,
  Outline,
  Toolbar,
} from '@maykin-ui/admin-ui';
import {Outlet} from 'react-router';

import {EnvironmentBadge, FormStatusBadge} from '@/components/badge';
import {useBreadcrumbItems} from '@/hooks/useBreadcrumbItems';

export interface BasicLayoutProps {
  /**
   * The content to be displayed inside the layout. If not provided, the Outlet component
   * will be used to render the current route's content.
   */
  children?: React.ReactNode;
  /**
   * The footer content to be displayed at the bottom of the layout.
   */
  footer?: React.ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({footer, children}) => {
  const breadcrumbItems = useBreadcrumbItems();
  return (
    <CardBaseTemplate
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
      <Toolbar
        align="space-between"
        direction="horizontal"
        pad
        items={[
          <Breadcrumbs key="breadcrumbs" items={breadcrumbItems} />,
          <Toolbar
            key="badges"
            direction="horizontal"
            pad={false}
            justify={false}
            items={[
              <EnvironmentBadge key="environment-badge" />,
              // Dynamically show/hide badge and set status
              <FormStatusBadge key="form-status-badge" status={'active'} />,
            ]}
          />,
        ]}
      />
      <Body fullHeight>{children ?? <Outlet />}</Body>
      {footer && (
        <Column direction="row" span={12}>
          {footer}
        </Column>
      )}
    </CardBaseTemplate>
  );
};

export default BasicLayout;
