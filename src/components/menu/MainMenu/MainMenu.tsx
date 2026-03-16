import {Accordion, Outline, Toolbar} from '@maykin-ui/admin-ui';
import {FormattedMessage} from 'react-intl';
import {generatePath, useMatches} from 'react-router';

import {PageId} from '@/routes/constants';

import NavItem from '../NavItem';
import type {MenuLevelProps} from '../types';

const MainMenu: React.FC<MenuLevelProps> = ({...toolbarProps}) => {
  const matches = useMatches();

  return (
    <Toolbar
      {...toolbarProps}
      items={[
        <Accordion
          key="form-subject"
          variant="primary"
          open
          toolbarProps={{
            align: 'space-between',
          }}
          items={[
            <NavItem
              key="form-categories"
              to={generatePath('/form-categories')}
              isActive={matches.some(m => m.id === PageId.FORM_CATEGORIES)}
              buttonProps={{align: 'space-between'}}
            >
              <FormattedMessage
                description="Main navigation label 'form categories'"
                defaultMessage="Categories"
              />
              <Outline.ArrowRightIcon />
            </NavItem>,
            <NavItem
              key="forms-overview"
              to={generatePath('/forms')}
              isActive={matches.some(m => m.id === PageId.FORM_OVERVIEW)}
              buttonProps={{align: 'space-between'}}
            >
              <FormattedMessage
                description="Main navigation label 'forms overview'"
                defaultMessage="Forms"
              />
              <Outline.ArrowRightIcon />
            </NavItem>,
            <NavItem
              key="form-statistics"
              to={generatePath('/form-submission-statistics')}
              isActive={matches.some(m => m.id === PageId.FORM_SUBMISSION_STATISTICS)}
              buttonProps={{align: 'space-between'}}
            >
              <FormattedMessage
                description="Main navigation label 'form statistics'"
                defaultMessage="Form statistics"
              />
              <Outline.ArrowRightIcon />
            </NavItem>,
          ]}
        >
          <FormattedMessage
            description="Main navigation label 'form subject'"
            defaultMessage="Forms"
          />
        </Accordion>,
      ]}
    />
  );
};
export default MainMenu;
