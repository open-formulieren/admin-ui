import {Accordion, Button, Input, Outline, Toolbar} from '@maykin-ui/admin-ui';
import {FormattedMessage} from 'react-intl';
import {generatePath, useMatches} from 'react-router';

import NavItem from '../NavItem';
import type {MenuLevelProps} from '../type';

const SearchInput: React.FC = () => {
  // @TODO search input logic
  return <Input type="text" placeholder="Search" icon={<Outline.MagnifyingGlassIcon />} />;
};

const AddFormStep: React.FC = () => {
  // @TODO 'add form step' logic
  return (
    <Button variant="secondary">
      <FormattedMessage
        description="Main navigation label 'add form step'"
        defaultMessage="Add new step"
      />
    </Button>
  );
};

const AddLogicRule: React.FC = () => {
  // @TODO 'add logic rule' logic
  return (
    <Button variant="secondary">
      <FormattedMessage
        description="Main navigation label 'add logic rule'"
        defaultMessage="Add new logic rule"
      />
    </Button>
  );
};

const FormSteps: React.FC = () => {
  // @TODO get form steps from formik state
  return (
    <>
      <NavItem to="#">Form step 1</NavItem>
      <NavItem to="#">Form step 2</NavItem>
    </>
  );
};

const FormDetailMenu: React.FC<MenuLevelProps> = ({...toolbarProps}) => {
  const matches = useMatches();
  const formId = '123'; // @TODO Fetch the formId from the formik state

  const isFormDesignActive = matches.some(m => m.id === 'form-design');
  const isFormLogicActive = matches.some(m => m.id === 'form-logic');
  const isFormSettingsActive = matches.some(m => m.id === 'form-settings');

  return (
    <Toolbar
      {...toolbarProps}
      items={[
        <NavItem
          key="back-to-forms-overview"
          to={generatePath('/forms')}
          buttonProps={{size: 's', bold: true}}
        >
          <Outline.ArrowLeftIcon />
          <FormattedMessage
            description="Main navigation label 'back to forms'"
            defaultMessage="Forms"
          />
        </NavItem>,

        // Form design sub-menu
        <Accordion
          key="form-design"
          variant={isFormDesignActive ? 'primary' : 'transparent'}
          open={isFormDesignActive}
          items={[
            <AddFormStep key="add-form-step" />,
            <NavItem
              key="form-introduction-page"
              to={generatePath('/forms/:formId/design/introduction-page', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-design-introduction-page')}
            >
              <Outline.PencilSquareIcon />
              <FormattedMessage
                description="Main navigation label 'form introduction page'"
                defaultMessage="Introduction page"
              />
            </NavItem>,
            <NavItem
              key="form-start-page"
              to={generatePath('/forms/:formId/design/start-page', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-design-start-page')}
            >
              <Outline.PencilSquareIcon />
              <FormattedMessage
                description="Main navigation label 'form start page'"
                defaultMessage="Start page"
              />
            </NavItem>,
            <NavItem
              key="form-steps"
              to={generatePath('/forms/:formId/design/form-steps', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-design-form-steps')}
            >
              <Outline.ListBulletIcon />
              <FormattedMessage
                description="Main navigation label 'form steps page'"
                defaultMessage="Form steps"
              />
            </NavItem>,
            <FormSteps key="form-steps-list" />,
            <NavItem
              key="confirmation"
              to={generatePath('/forms/:formId/design/confirmation', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-design-confirmation')}
            >
              <Outline.CheckIcon />
              <FormattedMessage
                description="Main navigation label 'confirmation'"
                defaultMessage="Confirmation"
              />
            </NavItem>,
          ]}
        >
          <Outline.PencilSquareIcon />
          <FormattedMessage
            description="Main navigation label 'form design'"
            defaultMessage="Design"
          />
        </Accordion>,

        // Form logic sub-menu
        <Accordion
          key="form-logic"
          variant={isFormLogicActive ? 'primary' : 'transparent'}
          open={isFormLogicActive}
          items={[
            <NavItem
              key="form-rules"
              to={generatePath('/forms/:formId/logic/form-rules', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-logic-form-rules')}
            >
              <Outline.ShareIcon />
              <FormattedMessage
                description="Main navigation label 'form rules'"
                defaultMessage="Form rules"
              />
            </NavItem>,
            matches.some(m => m.id === 'form-logic-form-rules') ? (
              <AddLogicRule key="add-logic-rule" />
            ) : null,
            <NavItem
              key="library-rules"
              to={generatePath('/forms/:formId/logic/library', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-logic-library')}
            >
              <Outline.BookmarkIcon />
              <FormattedMessage
                description="Main navigation label 'library rules'"
                defaultMessage="Library rules"
              />
            </NavItem>,
            <NavItem
              key="user-variables"
              to={generatePath('/forms/:formId/logic/user-variables', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-logic-user-variables')}
            >
              <Outline.VariableIcon />
              <FormattedMessage
                description="Main navigation label 'user variables'"
                defaultMessage="User variables"
              />
            </NavItem>,
          ]}
        >
          <Outline.ShareIcon />
          <FormattedMessage
            description="Main navigation label 'form logic'"
            defaultMessage="Logic"
          />
        </Accordion>,

        // Form settings sub-menu
        <Accordion
          key="form-settings"
          variant={isFormSettingsActive ? 'primary' : 'transparent'}
          open={isFormSettingsActive}
          items={[
            <SearchInput key="search-input" />,
            <NavItem
              key="general"
              to={generatePath('/forms/:formId/settings/general', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-general')}
            >
              <Outline.InformationCircleIcon />
              <FormattedMessage
                description="Main navigation label 'general settings'"
                defaultMessage="Information"
              />
            </NavItem>,
            <NavItem
              key="authentication"
              to={generatePath('/forms/:formId/settings/authentication', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-authentication')}
            >
              <Outline.ArrowRightOnRectangleIcon />
              <FormattedMessage
                description="Main navigation label 'authentication settings'"
                defaultMessage="Login"
              />
            </NavItem>,
            <NavItem
              key="availability"
              to={generatePath('/forms/:formId/settings/availability', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-availability')}
            >
              <Outline.CalendarIcon />
              <FormattedMessage
                description="Main navigation label 'availability settings'"
                defaultMessage="Availability"
              />
            </NavItem>,
            <NavItem
              key="presentation"
              to={generatePath('/forms/:formId/settings/presentation', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-presentation')}
            >
              <Outline.PencilIcon />
              <FormattedMessage
                description="Main navigation label 'presentation settings'"
                defaultMessage="Presentation"
              />
            </NavItem>,
            <NavItem
              key="prefill"
              to={generatePath('/forms/:formId/settings/prefill', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-prefill')}
            >
              <Outline.PencilSquareIcon />
              <FormattedMessage
                description="Main navigation label 'prefill settings'"
                defaultMessage="Prefill"
              />
            </NavItem>,
            <NavItem
              key="variables"
              to={generatePath('/forms/:formId/settings/variables', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-variables')}
            >
              <Outline.VariableIcon />
              <FormattedMessage
                description="Main navigation label 'variables settings'"
                defaultMessage="Variables"
              />
            </NavItem>,
            <NavItem
              key="registration"
              to={generatePath('/forms/:formId/settings/registration', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-registration')}
            >
              <Outline.InboxArrowDownIcon />
              <FormattedMessage
                description="Main navigation label 'registration settings'"
                defaultMessage="Registration"
              />
            </NavItem>,
            <NavItem
              key="confirmation"
              to={generatePath('/forms/:formId/settings/confirmation', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-confirmation')}
            >
              <Outline.CheckIcon />
              <FormattedMessage
                description="Main navigation label 'confirmation settings'"
                defaultMessage="Confirmation"
              />
            </NavItem>,
            <NavItem
              key="submissions"
              to={generatePath('/forms/:formId/settings/submissions', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-submissions')}
            >
              <Outline.ArrowRightCircleIcon />
              <FormattedMessage
                description="Main navigation label 'submissions settings'"
                defaultMessage="Submissions"
              />
            </NavItem>,
            <NavItem
              key="payment"
              to={generatePath('/forms/:formId/settings/payment', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-payment')}
            >
              <Outline.CreditCardIcon />
              <FormattedMessage
                description="Main navigation label 'payment settings'"
                defaultMessage="Payment"
              />
            </NavItem>,
            <NavItem
              key="data-removal"
              to={generatePath('/forms/:formId/settings/data-removal', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-data-removal')}
            >
              <Outline.ArchiveBoxIcon />
              <FormattedMessage
                description="Main navigation label 'data removal settings'"
                defaultMessage="Data removal"
              />
            </NavItem>,
            <NavItem
              key="translations"
              to={generatePath('/forms/:formId/settings/translations', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-translations')}
            >
              <Outline.LanguageIcon />
              <FormattedMessage
                description="Main navigation label 'translations settings'"
                defaultMessage="Translations"
              />
            </NavItem>,
            <NavItem
              key="history"
              to={generatePath('/forms/:formId/settings/history', {formId: formId})}
              isActive={matches.some(m => m.id === 'form-settings-history')}
            >
              <Outline.BookOpenIcon />
              <FormattedMessage
                description="Main navigation label 'history settings'"
                defaultMessage="History"
              />
            </NavItem>,
          ]}
        >
          <Outline.Cog6ToothIcon />
          <FormattedMessage
            description="Main navigation label 'form settings'"
            defaultMessage="Settings"
          />
        </Accordion>,
      ]}
    />
  );
};
export default FormDetailMenu;
