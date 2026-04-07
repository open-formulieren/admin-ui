import {Body, Button, Modal, Outline, Toolbar} from '@maykin-ui/admin-ui';
import type {LinkAttributes} from '@remirror/extension-link';
import {
  useActive,
  useAttrs,
  useChainedCommands,
  useCurrentSelection,
  useEditorState,
  useMarkRange,
  useSelectedText,
} from '@remirror/react';
import {FloatingToolbar} from '@remirror/react-ui';
import {Formik, useFormikContext} from 'formik';
import {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import type {FromToProps} from 'remirror';

import {Select} from '@/components/form/Select';
import {TextField} from '@/components/form/TextField';

export interface LinkEditorForm {
  url: string;
  text: string;
  target: '_blank' | '_self';
}

interface LinkEditor {
  /**
   * Open the link editor modal.
   */
  openEditorModal: () => void;
  /**
   * Remove the selected link.
   */
  removeLink: () => void;
  /**
   * Whether the current selection is a link that can be removed.
   */
  selectionIsLink: boolean;
}

const LinkEditorContext = createContext<LinkEditor>({
  openEditorModal: () => {},
  removeLink: () => {},
  /**
   * Whether the current selection is a link that can be removed.
   */
  selectionIsLink: false,
});

/**
 * Context provider for the LinkEditor component.
 *
 * This provider gives access to basic link editing functionality, such as opening the
 * editor modal and removing links.
 * This implementation aims to centralize the link editing logic and make it easier to
 * keep the controls, in the editor toolbar and the floating actions, in sync.
 */
export const LinkEditorProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const active = useActive();
  const attrs = useAttrs();
  const chain = useChainedCommands();
  const selection = useCurrentSelection();
  const editorState = useEditorState();
  const linkRange = useMarkRange('link');
  const selectedText = useSelectedText();

  const activeLink = active.link();

  // Get the selected text. If the selection is inside a link, use the entire link text.
  const currentText = useMemo<string>(() => {
    return !linkRange
      ? selectedText || ''
      : editorState.doc.textBetween(linkRange.from, linkRange.to, '');
  }, [editorState.doc, linkRange, selectedText]);

  // Get the initial values for the modal. If the selection is inside a link, use the
  // link attributes. Otherwise, use some default values.
  const initialValues = useMemo<LinkEditorForm>(() => {
    const linkAttrs = attrs.link();
    if (!activeLink || !linkAttrs) return {url: '', text: currentText, target: '_self'};

    return {
      url: linkAttrs.href as string,
      text: currentText,
      target: linkAttrs.target as LinkEditorForm['target'],
    };
  }, [activeLink, attrs, currentText]);

  const openEditorModal = useCallback(() => {
    // If the cursor is inside a link, and selection is empty or a part of the link is
    // selected, expand the selection to the whole link before opening the modal.
    if (linkRange) {
      chain.selectText({from: linkRange.from, to: linkRange.to}).run();
    }

    setIsModalOpen(true);
  }, [chain, linkRange]);

  const removeSelectedLink = useCallback(() => {
    if (activeLink) chain.removeLink().focus().run();
  }, [activeLink, chain]);

  const onSubmit = useCallback(
    (data: LinkEditorForm) => {
      const newText = data.text || data.url;
      const hasSelection = selection.from !== selection.to;

      const linkAttrs: LinkAttributes = {href: data.url, target: data.target, auto: false};
      const linkRange: FromToProps = {from: selection.from, to: selection.from + newText.length};

      if (hasSelection) {
        // When inserting/editing a link on pre-existing text.
        chain
          .replaceText({
            selection: {from: selection.from, to: selection.to},
            content: newText,
          })
          .updateLink(linkAttrs, linkRange)
          .focus()
          .run();
        return;
      }

      // When inserting a link without replacing pre-existing text.
      chain.insertText(newText).updateLink(linkAttrs, linkRange).focus().run();
    },
    [chain, selection.from, selection.to]
  );

  return (
    <LinkEditorContext.Provider
      value={{openEditorModal, removeLink: removeSelectedLink, selectionIsLink: activeLink}}
    >
      {children}
      <LinkEditorModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </LinkEditorContext.Provider>
  );
};

export const useLinkEditor = () => useContext(LinkEditorContext);

interface LinkEditorModalProps {
  initialValues: LinkEditorForm;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: LinkEditorForm) => void;
}

const LinkEditorModal: React.FC<LinkEditorModalProps> = ({
  initialValues,
  onSubmit,
  open,
  onClose,
}) => {
  const intl = useIntl();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <FormattedMessage
          description="WYSIWYG editor link control modal title"
          defaultMessage="Insert/Edit link"
        />
      }
      closedby="any"
      size="m"
    >
      <Body>
        <Formik<LinkEditorForm>
          initialValues={initialValues}
          enableReinitialize
          onSubmit={values => {
            onSubmit(values);
            onClose();
          }}
        >
          <>
            <TextField
              name="url"
              label={
                <FormattedMessage
                  description="WYSIWYG editor link control modal 'url' field label"
                  defaultMessage="URL"
                />
              }
            />
            <TextField
              name="text"
              label={
                <FormattedMessage
                  description="WYSIWYG editor link control modal 'text' field label"
                  defaultMessage="Text to display"
                />
              }
            />
            <Select
              name="target"
              label={
                <FormattedMessage
                  description="WYSIWYG editor link control modal 'target' field label"
                  defaultMessage="Open link in..."
                />
              }
              options={[
                {
                  value: '_blank',
                  label: intl.formatMessage({
                    description:
                      "WYSIWYG editor link control modal 'target' field option '_blank' label",
                    defaultMessage: 'New window',
                  }),
                },
                {
                  value: '_self',
                  label: intl.formatMessage({
                    description:
                      "WYSIWYG editor link control modal 'target' field option '_self' label",
                    defaultMessage: 'Current window',
                  }),
                },
              ]}
            />
            <Toolbar pad="v" align="end">
              <Button variant="secondary" type="button" onClick={onClose}>
                <FormattedMessage
                  description="WYSIWYG editor link control modal 'cancel' button label"
                  defaultMessage="Cancel"
                />
              </Button>
              <SubmitButton />
            </Toolbar>
          </>
        </Formik>
      </Body>
    </Modal>
  );
};

const SubmitButton: React.FC = () => {
  const {submitForm} = useFormikContext();

  return (
    <Button variant="primary" type="button" onClick={() => submitForm()}>
      <FormattedMessage
        description="WYSIWYG editor link control modal 'save' button label"
        defaultMessage="Save"
      />
    </Button>
  );
};

export const FloatingLinkToolbar = () => {
  const {openEditorModal, removeLink, selectionIsLink} = useLinkEditor();

  return (
    <FloatingToolbar>
      <Button onClick={openEditorModal}>
        <Outline.PencilIcon />
      </Button>
      {selectionIsLink && (
        <Button onClick={removeLink}>
          <Outline.LinkSlashIcon />
        </Button>
      )}
    </FloatingToolbar>
  );
};
