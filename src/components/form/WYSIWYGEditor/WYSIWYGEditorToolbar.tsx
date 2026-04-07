import type {DropdownProps, ToolbarProps} from '@maykin-ui/admin-ui';
import {Button, Dropdown, Hr, Outline, Toolbar} from '@maykin-ui/admin-ui';
import {useActive, useChainedCommands, useCommands} from '@remirror/react';
import {FormattedMessage, useIntl} from 'react-intl';

import {useLinkEditor} from './LinkEditor';

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
      <ParagraphFormattingDropdown />
      <TableDropdown />
    </ToolbarGroup>
    <ToolbarGroup>
      <LinkButton />
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
  title?: string;
  'aria-label'?: string;
  activateOnHover?: boolean;
  placement?: DropdownProps['placement'];
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
  activateOnHover,
  placement,
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
      activateOnHover={activateOnHover}
      placement={placement}
    >
      {children}
    </Dropdown>
  );
};

interface ToolbarDropdownItemProps extends React.PropsWithChildren {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

/**
 * Simple component for rendering a WYSIWYG toolbar dropdown item.
 *
 * This component is used to render individual dropdown items in the WYSIWYG editor
 * toolbar. It handles the visual representation of the active state. Additionally, some
 * basic Button component configuration is applied.
 */
const ToolbarDropdownItem: React.FC<ToolbarDropdownItemProps> = ({
  active = false,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <Button
      size="xxs"
      type="button"
      onClick={onClick}
      disabled={disabled}
      variant={active ? 'accent' : 'transparent'}
    >
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

const ParagraphFormattingDropdown: React.FC = () => {
  const chain = useChainedCommands();
  const active = useActive();
  const intl = useIntl();

  return (
    <ToolbarDropdown
      label={
        <>
          <Outline.Bars3BottomLeftIcon />
          <Outline.ChevronDownIcon />
        </>
      }
      title={intl.formatMessage({
        description: 'WYSIWYG editor paragraph formatting control button title',
        defaultMessage: 'Paragraph formatting',
      })}
      aria-label={intl.formatMessage({
        description: 'WYSIWYG editor paragraph formatting control button aria label',
        defaultMessage: 'Paragraph formatting',
      })}
    >
      <ToolbarDropdownItem
        onClick={() => chain.setTextAlignment('left').focus().run()}
        active={
          active.paragraph({nodeTextAlignment: 'left'}) ||
          active.tableCell({nodeTextAlignment: 'left'})
        }
      >
        <Outline.Bars3BottomLeftIcon />
        <FormattedMessage
          description="WYSIWYG editor paragraph formatting control 'align left' button text"
          defaultMessage="Align left"
        />
      </ToolbarDropdownItem>
      <ToolbarDropdownItem
        onClick={() => chain.setTextAlignment('center').focus().run()}
        active={
          active.paragraph({nodeTextAlignment: 'center'}) ||
          active.tableCell({nodeTextAlignment: 'center'})
        }
      >
        <Outline.Bars3Icon />
        <FormattedMessage
          description="WYSIWYG editor paragraph formatting control 'align center' button text"
          defaultMessage="Align center"
        />
      </ToolbarDropdownItem>
      <ToolbarDropdownItem
        onClick={() => chain.setTextAlignment('right').focus().run()}
        active={
          active.paragraph({nodeTextAlignment: 'right'}) ||
          active.tableCell({nodeTextAlignment: 'right'})
        }
      >
        <Outline.Bars3BottomRightIcon />
        <FormattedMessage
          description="WYSIWYG editor paragraph formatting control 'align right' button text"
          defaultMessage="Align right"
        />
      </ToolbarDropdownItem>
      <ToolbarDropdownItem
        onClick={() => chain.setTextAlignment('justify').focus().run()}
        active={
          active.paragraph({nodeTextAlignment: 'justify'}) ||
          active.tableCell({nodeTextAlignment: 'justify'})
        }
      >
        <Outline.Bars3Icon />
        <FormattedMessage
          description="WYSIWYG editor paragraph formatting control 'align justify' button text"
          defaultMessage="Align justify"
        />
      </ToolbarDropdownItem>
      <Hr margin="xs" style={{width: '90%', alignSelf: 'center'}} />
      <ToolbarDropdownItem onClick={() => chain.increaseIndent().focus().run()}>
        <Outline.ArrowRightStartOnRectangleIcon />
        <FormattedMessage
          description="WYSIWYG editor paragraph formatting control 'increase indent' button text"
          defaultMessage="Increase indent"
        />
      </ToolbarDropdownItem>
      <ToolbarDropdownItem
        onClick={() => chain.decreaseIndent().focus().run()}
        disabled={active.paragraph({nodeIndent: 0}) || active.tableCell({nodeIndent: 0})}
      >
        <Outline.ArrowRightStartOnRectangleIcon />
        <FormattedMessage
          description="WYSIWYG editor paragraph formatting control 'decrease indent' button text"
          defaultMessage="Decrease indent"
        />
      </ToolbarDropdownItem>
    </ToolbarDropdown>
  );
};

const TableDropdown: React.FC = () => {
  const chain = useChainedCommands();
  const {
    splitTableCell,
    mergeTableCells,
    addTableColumnAfter,
    addTableColumnBefore,
    deleteTableColumn,
    addTableRowAfter,
    addTableRowBefore,
    deleteTableRow,
    deleteTable,
  } = useCommands();
  const active = useActive();
  const intl = useIntl();

  return (
    <ToolbarDropdown
      label={
        <>
          <Outline.TableCellsIcon />
          <Outline.ChevronDownIcon />
        </>
      }
      title={intl.formatMessage({
        description: 'WYSIWYG editor table control button title',
        defaultMessage: 'Table',
      })}
      aria-label={intl.formatMessage({
        description: 'WYSIWYG editor table control button aria label',
        defaultMessage: 'Table',
      })}
    >
      <ToolbarDropdownItem
        onClick={() => chain.createTable().focus().run()}
        active={active.table()}
      >
        <Outline.TableCellsIcon />
        <FormattedMessage
          description="WYSIWYG editor table control 'create table' button text"
          defaultMessage="Create table"
        />
      </ToolbarDropdownItem>
      <ToolbarDropdown
        activateOnHover
        placement="right"
        label={
          <>
            <FormattedMessage
              description="WYSIWYG editor table control 'cell actions' button text"
              defaultMessage="Cell"
            />
            <Outline.ChevronRightIcon />
          </>
        }
      >
        <ToolbarDropdownItem
          onClick={() => chain.mergeTableCells().focus().run()}
          disabled={!mergeTableCells.enabled()}
        >
          <Outline.SquaresPlusIcon />
          <FormattedMessage
            description="WYSIWYG editor table control 'merge table cells' button text"
            defaultMessage="Merge table cells"
          />
        </ToolbarDropdownItem>
        <ToolbarDropdownItem
          onClick={() => chain.splitTableCell().focus().run()}
          disabled={!splitTableCell.enabled()}
        >
          <Outline.XMarkIcon />
          <FormattedMessage
            description="WYSIWYG editor table control 'split table cells' button text"
            defaultMessage="Split table cells"
          />
        </ToolbarDropdownItem>
      </ToolbarDropdown>
      <ToolbarDropdown
        activateOnHover
        placement="right"
        label={
          <>
            <FormattedMessage
              description="WYSIWYG editor table control 'row actions' button text"
              defaultMessage="Row"
            />
            <Outline.ChevronRightIcon />
          </>
        }
      >
        <ToolbarDropdownItem
          onClick={() => chain.addTableRowBefore().focus().run()}
          disabled={!addTableRowBefore.enabled()}
        >
          <Outline.SquaresPlusIcon />
          <FormattedMessage
            description="WYSIWYG editor table control 'insert row before' button text"
            defaultMessage="Insert row before"
          />
        </ToolbarDropdownItem>
        <ToolbarDropdownItem
          onClick={() => chain.addTableRowAfter().focus().run()}
          disabled={!addTableRowAfter.enabled()}
        >
          <Outline.SquaresPlusIcon />
          <FormattedMessage
            description="WYSIWYG editor table control 'insert row after' button text"
            defaultMessage="Insert row after"
          />
        </ToolbarDropdownItem>
        <ToolbarDropdownItem
          onClick={() => chain.deleteTableRow().focus().run()}
          disabled={!deleteTableRow.enabled()}
        >
          <Outline.XMarkIcon />
          <FormattedMessage
            description="WYSIWYG editor table control 'delete row' button text"
            defaultMessage="Delete row"
          />
        </ToolbarDropdownItem>
      </ToolbarDropdown>
      <ToolbarDropdown
        activateOnHover
        placement="right"
        label={
          <>
            <FormattedMessage
              description="WYSIWYG editor table control 'column actions' button text"
              defaultMessage="Column"
            />
            <Outline.ChevronRightIcon />
          </>
        }
      >
        <ToolbarDropdownItem
          onClick={() => chain.addTableColumnBefore().focus().run()}
          disabled={!addTableColumnBefore.enabled()}
        >
          <Outline.SquaresPlusIcon />
          <FormattedMessage
            description="WYSIWYG editor table control 'insert column before' button text"
            defaultMessage="Insert column before"
          />
        </ToolbarDropdownItem>
        <ToolbarDropdownItem
          onClick={() => chain.addTableColumnAfter().focus().run()}
          disabled={!addTableColumnAfter.enabled()}
        >
          <Outline.SquaresPlusIcon />
          <FormattedMessage
            description="WYSIWYG editor table control 'insert column after' button text"
            defaultMessage="Insert column after"
          />
        </ToolbarDropdownItem>
        <ToolbarDropdownItem
          onClick={() => chain.deleteTableColumn().focus().run()}
          disabled={!deleteTableColumn.enabled()}
        >
          <Outline.XMarkIcon />
          <FormattedMessage
            description="WYSIWYG editor table control 'delete column' button text"
            defaultMessage="Delete column"
          />
        </ToolbarDropdownItem>
      </ToolbarDropdown>
      <Hr margin="xs" style={{width: '90%', alignSelf: 'center'}} />
      <ToolbarDropdownItem
        onClick={() => chain.deleteTable().focus().run()}
        disabled={!deleteTable.enabled()}
      >
        <Outline.XMarkIcon />
        <FormattedMessage
          description="WYSIWYG editor table control 'delete table' button text"
          defaultMessage="Delete table"
        />
      </ToolbarDropdownItem>
    </ToolbarDropdown>
  );
};

const LinkButton: React.FC = () => {
  const {openEditorModal, selectionIsLink} = useLinkEditor();
  const intl = useIntl();

  return (
    <ToolbarButton
      active={selectionIsLink}
      onClick={openEditorModal}
      title={intl.formatMessage({
        description: 'WYSIWYG editor link control button title',
        defaultMessage: 'Link',
      })}
      aria-label={intl.formatMessage({
        description: 'WYSIWYG editor link control button aria label',
        defaultMessage: 'Link',
      })}
    >
      <Outline.LinkIcon />
    </ToolbarButton>
  );
};

export default WYSIWYGEditorToolbar;
