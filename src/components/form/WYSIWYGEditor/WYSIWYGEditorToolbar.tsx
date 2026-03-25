import type {ToolbarProps} from '@maykin-ui/admin-ui';
import {Button, Dropdown, Outline, Toolbar} from '@maykin-ui/admin-ui';
import {useActive, useChainedCommands} from '@remirror/react';
import {FormattedMessage, useIntl} from 'react-intl';

const WYSIWYGEditorToolbar = () => (
  <ToolbarGroup padSize="s">
    <ToolbarGroup>
      <HeadingDropdown />
    </ToolbarGroup>
    <ToolbarGroup>
      <BoldButton />
      <ItalicButton />
      <StrikethroughButton />
      <UnderlineButton />
    </ToolbarGroup>
    <ToolbarGroup>
      <ListDropdown />
    </ToolbarGroup>
  </ToolbarGroup>
);

interface ToolbarGroupProps extends React.PropsWithChildren {
  padSize?: ToolbarProps['padSize'];
}

const ToolbarGroup: React.FC<ToolbarGroupProps> = ({children, padSize = 'xs'}) => (
  <Toolbar
    direction="h"
    pad
    padSize={padSize}
    justify={false}
    // border and border-radius styling will be available through toolbar props in a
    // future release of the Maykin admin-ui
    style={{border: '1px solid #ccc', borderRadius: '4px'}}
  >
    {children}
  </Toolbar>
);

interface ToolbarButtonProps extends React.PropsWithChildren {
  active: boolean;
  onClick: () => void;
  title: string;
  'aria-label': string;
}

/**
 * Simple component for rendering a WYSIWYG toolbar button.
 *
 * This component is used to render individual buttons in the WYSIWYG editor toolbar.
 * It handles the visual and a11y representation of the active state. Additionally, some
 * basic Button component configuration is applied.
 */
const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  active,
  onClick,
  title,
  'aria-label': ariaLabel,
  children,
}) => {
  return (
    <Button
      size="xxs"
      type="button"
      onClick={onClick}
      variant={active ? 'primary' : 'transparent'}
      title={title}
      aria-label={ariaLabel}
      aria-pressed={active}
    >
      {children}
    </Button>
  );
};

interface ToolbarDropdownProps extends React.PropsWithChildren {
  label: React.ReactNode;
  title: string;
  'aria-label': string;
}

/**
 * Simple component for rendering a WYSIWYG toolbar dropdown.
 *
 * This component is used to render individual dropdowns in the WYSIWYG editor toolbar.
 * It applies some basic Dropdown component styling and configuration.
 */
const ToolbarDropdown: React.FC<ToolbarDropdownProps> = ({
  label,
  title,
  'aria-label': ariaLabel,
  children,
}) => {
  return (
    <Dropdown
      label={label}
      size="xxs"
      type="button"
      toolbarProps={{compact: true}}
      variant="transparent"
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </Dropdown>
  );
};

interface ToolbarDropdownItemProps extends React.PropsWithChildren {
  active: boolean;
  onClick: () => void;
}

/**
 * Simple component for rendering a WYSIWYG toolbar dropdown item.
 *
 * This component is used to render individual dropdown items in the WYSIWYG editor
 * toolbar. It handles the visual representation of the active state. Additionally, some
 * basic Button component configuration is applied.
 */
const ToolbarDropdownItem: React.FC<ToolbarDropdownItemProps> = ({active, onClick, children}) => {
  return (
    <Button size="xxs" type="button" onClick={onClick} variant={active ? 'accent' : 'transparent'}>
      {children}
    </Button>
  );
};

const BoldButton: React.FC = () => {
  const chain = useChainedCommands();
  const active = useActive();
  const intl = useIntl();

  return (
    <ToolbarButton
      active={active.bold()}
      onClick={() => chain.toggleBold().focus().run()}
      title={intl.formatMessage({
        description: 'WYSIWYG editor bold control button title',
        defaultMessage: 'Bold ([Ctrl]B or ⌘B)',
      })}
      aria-label={intl.formatMessage({
        description: 'WYSIWYG editor bold control button aria label',
        defaultMessage: 'Bold',
      })}
    >
      <b>B</b>
    </ToolbarButton>
  );
};

const ItalicButton: React.FC = () => {
  const chain = useChainedCommands();
  const active = useActive();
  const intl = useIntl();

  return (
    <ToolbarButton
      active={active.italic()}
      onClick={() => chain.toggleItalic().focus().run()}
      title={intl.formatMessage({
        description: 'WYSIWYG editor italic control button title',
        defaultMessage: 'Italic ([Ctrl]I or ⌘I)',
      })}
      aria-label={intl.formatMessage({
        description: 'WYSIWYG editor italic control button aria label',
        defaultMessage: 'Italic',
      })}
    >
      <i>I</i>
    </ToolbarButton>
  );
};

const StrikethroughButton: React.FC = () => {
  const chain = useChainedCommands();
  const active = useActive();
  const intl = useIntl();

  return (
    <ToolbarButton
      active={active.strike()}
      onClick={() => chain.toggleStrike().focus().run()}
      title={intl.formatMessage({
        description: 'WYSIWYG editor strikethrough control button title',
        defaultMessage: 'Strikethrough ([Ctrl]D or ⌘D)',
      })}
      aria-label={intl.formatMessage({
        description: 'WYSIWYG editor strikethrough control button aria label',
        defaultMessage: 'Strikethrough',
      })}
    >
      <s>S</s>
    </ToolbarButton>
  );
};

const UnderlineButton: React.FC = () => {
  const chain = useChainedCommands();
  const active = useActive();
  const intl = useIntl();

  return (
    <ToolbarButton
      active={active.underline()}
      onClick={() => chain.toggleUnderline().focus().run()}
      title={intl.formatMessage({
        description: 'WYSIWYG editor underline control button title',
        defaultMessage: 'Underline ([Ctrl]U or ⌘U)',
      })}
      aria-label={intl.formatMessage({
        description: 'WYSIWYG editor underline control button aria label',
        defaultMessage: 'Underline',
      })}
    >
      <u>U</u>
    </ToolbarButton>
  );
};

const HeadingDropdown: React.FC = () => {
  const chain = useChainedCommands();
  const active = useActive();
  const intl = useIntl();

  const headingLevels = [2, 3, 4, 5, 6];

  return (
    <ToolbarDropdown
      label={
        <>
          H
          <Outline.ChevronDownIcon />
        </>
      }
      title={intl.formatMessage({
        description: 'WYSIWYG editor heading control button title',
        defaultMessage: 'Heading',
      })}
      aria-label={intl.formatMessage({
        description: 'WYSIWYG editor heading control button aria label',
        defaultMessage: 'Heading',
      })}
    >
      <ToolbarDropdownItem
        onClick={() =>
          // If the editor is currently in a heading, toggle it off
          active.heading() && chain.toggleHeading().focus().run()
        }
        // If no heading is active, then it must be a paragraph
        active={!active.heading()}
      >
        <FormattedMessage
          description="WYSIWYG editor heading control 'paragraph' button text"
          defaultMessage="Paragraph"
        />
      </ToolbarDropdownItem>

      {headingLevels.map(level => (
        <ToolbarDropdownItem
          key={`heading-dropdown-level-${level}`}
          onClick={() => chain.toggleHeading({level}).focus().run()}
          active={active.heading({level})}
        >
          <FormattedMessage
            description="WYSIWYG editor heading control 'heading' button text"
            defaultMessage="Heading {headingLevel}"
            values={{headingLevel: level}}
          />
        </ToolbarDropdownItem>
      ))}
    </ToolbarDropdown>
  );
};

const ListDropdown: React.FC = () => {
  const chain = useChainedCommands();
  const active = useActive();
  const intl = useIntl();

  return (
    <ToolbarDropdown
      label={
        <>
          <Outline.ListBulletIcon />
          <Outline.ChevronDownIcon />
        </>
      }
      title={intl.formatMessage({
        description: 'WYSIWYG editor list control button title',
        defaultMessage: 'List',
      })}
      aria-label={intl.formatMessage({
        description: 'WYSIWYG editor list control button aria label',
        defaultMessage: 'List',
      })}
    >
      <ToolbarDropdownItem
        onClick={() => chain.toggleBulletList().focus().run()}
        active={active.bulletList()}
      >
        <Outline.ListBulletIcon />
        <FormattedMessage
          description="WYSIWYG editor list control 'bullet list' button text"
          defaultMessage="Bullet list"
        />
      </ToolbarDropdownItem>
      <ToolbarDropdownItem
        onClick={() => chain.toggleOrderedList().focus().run()}
        active={active.orderedList()}
      >
        <Outline.NumberedListIcon />
        <FormattedMessage
          description="WYSIWYG editor list control 'ordered list' button text"
          defaultMessage="Ordered list"
        />
      </ToolbarDropdownItem>
    </ToolbarDropdown>
  );
};

export default WYSIWYGEditorToolbar;
