import type {Meta, StoryObj} from '@storybook/react-vite';
import {reactRouterParameters} from 'storybook-addon-remix-react-router';
import {expect, userEvent, within} from 'storybook/test';

import {mockFormDetailsGet} from '@/api-mocks';
import routes from '@/routes';
import {withMswRouter} from '@/sb-decorators';

import Sidebar from './Sidebar';

export default {
  title: 'Internal API / Menu / Sidebar',
  component: Sidebar,
  decorators: [withMswRouter],
} satisfies Meta<typeof Sidebar>;

type Story = StoryObj<typeof Sidebar>;

export const MainMenu: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/',
      },
      routing: {
        ...routes[0],
        Component: Sidebar,
      },
    }),
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    const subMenu = await canvas.findByRole('region');

    const formNavItems = canvas.getAllByRole('button', {name: 'Forms'});

    // The first 'form' nav item is the menu accordion and is opened
    expect(formNavItems[0]).toHaveAttribute('aria-expanded', 'true');

    // We need to 'search' the elements actively, as navigation updates the DOM.
    // Otherwise, the references would become stale.
    const getCategoriesNavItem = () => canvas.getByRole('button', {name: 'Categories'});
    const getFormStatsNavItem = () => canvas.getByRole('button', {name: 'Form statistics'});

    await step('Initial state: All nav items are inactive', async () => {
      const navItems = within(subMenu).getAllByRole('button');
      expect(navItems).toHaveLength(3);
      // Validate the contents of the nav items
      expect(navItems[0]).toHaveTextContent('Categories');
      expect(navItems[1]).toHaveTextContent('Forms');
      expect(navItems[2]).toHaveTextContent('Form statistics');

      // All menu items are visible and none are active
      navItems.forEach(navItem => {
        expect(navItem).toBeVisible();
        expect(navItem).not.toHaveAttribute('aria-current');
      });
    });

    await step('Select categories nav item', async () => {
      await userEvent.click(getCategoriesNavItem());

      // The categories nav items should now be active
      expect(getCategoriesNavItem()).toHaveAttribute('aria-current', 'page');
    });

    await step('Select form statistics nav item', async () => {
      await userEvent.click(getFormStatsNavItem());

      // The form stats nav items should now be active, and categories shouldn't anymore
      expect(getFormStatsNavItem()).toHaveAttribute('aria-current', 'page');
      expect(getCategoriesNavItem()).not.toHaveAttribute('aria-current');
    });
  },
};

export const FormDesignMenu: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/forms/123/design',
      },
      routing: {
        ...routes[0],
        Component: Sidebar,
      },
    }),
    msw: {
      handlers: [mockFormDetailsGet()],
    },
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    const subMenu = within(await canvas.findByRole('region'));

    const designNavItem = canvas.getByRole('button', {name: 'Design'});
    const logicNavItem = canvas.getByRole('button', {name: 'Logic'});
    const settingsNavItem = canvas.getByRole('button', {name: 'Settings'});

    // The design nav item is opened, the others are closed
    expect(designNavItem).toHaveAttribute('aria-expanded', 'true');
    expect(logicNavItem).toHaveAttribute('aria-expanded', 'false');
    expect(settingsNavItem).toHaveAttribute('aria-expanded', 'false');

    await step('All design nav items are inactive', async () => {
      const navItems = subMenu.getAllByRole('button');

      expect(navItems).toHaveLength(7);

      // Validate the contents of the nav items
      expect(navItems[0]).toHaveTextContent('Add new step');
      expect(navItems[1]).toHaveTextContent('Introduction page');
      expect(navItems[2]).toHaveTextContent('Start page');
      expect(navItems[3]).toHaveTextContent('Form steps');
      expect(navItems[4]).toHaveTextContent('Form step 1');
      expect(navItems[5]).toHaveTextContent('Form step 2');
      expect(navItems[6]).toHaveTextContent('Confirmation');

      // All menu items are visible and none are active
      navItems.forEach(navItem => {
        expect(navItem).toBeVisible();
        expect(navItem).not.toHaveAttribute('aria-current');
      });
    });
  },
};

export const FormLogicMenu: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/forms/123/logic',
      },
      routing: {
        ...routes[0],
        Component: Sidebar,
      },
    }),
    msw: {
      handlers: [mockFormDetailsGet()],
    },
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    const subMenu = await canvas.findByRole('region');

    const designNavItem = canvas.getByRole('button', {name: 'Design'});
    const logicNavItem = canvas.getByRole('button', {name: 'Logic'});
    const settingsNavItem = canvas.getByRole('button', {name: 'Settings'});

    // The logic nav item is opened, the others are closed
    expect(designNavItem).toHaveAttribute('aria-expanded', 'false');
    expect(logicNavItem).toHaveAttribute('aria-expanded', 'true');
    expect(settingsNavItem).toHaveAttribute('aria-expanded', 'false');

    // We need to 'search' the elements actively, as navigation updates the DOM.
    // Otherwise, the references would become stale.
    const getFormRulesNavItem = () => canvas.getByRole('button', {name: 'Form rules'});
    const getAddRuleButton = () => canvas.queryByRole('button', {name: 'Add new logic rule'});
    const getLibraryRulesNavItem = () => canvas.getByRole('button', {name: 'Library rules'});

    await step('Initial state: all logic nav items are inactive', async () => {
      const navItems = within(subMenu).getAllByRole('button');
      expect(navItems).toHaveLength(3);
      // Validate the contents of the nav items
      expect(navItems[0]).toHaveTextContent('Form rules');
      expect(navItems[1]).toHaveTextContent('Library rules');
      expect(navItems[2]).toHaveTextContent('User variables');

      // All menu items are visible and none are active
      navItems.forEach(navItem => {
        expect(navItem).toBeVisible();
        expect(navItem).not.toHaveAttribute('aria-current');
      });

      // The "add new logic rule" button should be hidden
      expect(getAddRuleButton()).not.toBeInTheDocument();
    });

    await step('Select form rules nav item', async () => {
      await userEvent.click(getFormRulesNavItem());

      // The form rules nav items should now be active, and the 'add new logic rule'
      // button should be shown.
      expect(getFormRulesNavItem()).toHaveAttribute('aria-current', 'page');
      expect(getAddRuleButton()).toBeVisible();
    });

    await step('Select library rules nav item', async () => {
      await userEvent.click(getLibraryRulesNavItem());

      // The library rules nav items should now be active, and form rules shouldn't
      expect(getLibraryRulesNavItem()).toHaveAttribute('aria-current', 'page');
      expect(getFormRulesNavItem()).not.toHaveAttribute('aria-current');
      // The 'add new logic rule' button should again be hidden
      expect(getAddRuleButton()).not.toBeInTheDocument();
    });
  },
};

export const FormSettingsMenu: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/forms/123/settings',
      },
      routing: {
        ...routes[0],
        Component: Sidebar,
      },
    }),
    msw: {
      handlers: [mockFormDetailsGet()],
    },
  },
  play: async ({canvasElement, step}) => {
    const canvas = within(canvasElement);
    const subMenu = within(canvas.getByRole('region'));

    const designNavItem = canvas.getByRole('button', {name: 'Design'});
    const logicNavItem = canvas.getByRole('button', {name: 'Logic'});
    const settingsNavItem = canvas.getByRole('button', {name: 'Settings'});

    // The settings nav item is opened, the others are closed
    expect(designNavItem).toHaveAttribute('aria-expanded', 'false');
    expect(logicNavItem).toHaveAttribute('aria-expanded', 'false');
    expect(settingsNavItem).toHaveAttribute('aria-expanded', 'true');

    // Expect the search input to be visible
    expect(subMenu.getByRole('textbox', {name: 'Search in settings'})).toBeVisible();

    await step('All settings nav items are inactive', async () => {
      const navItems = subMenu.getAllByRole('button');
      expect(navItems).toHaveLength(13);

      // Validate the contents of the nav items
      expect(navItems[0]).toHaveTextContent('Information');
      expect(navItems[1]).toHaveTextContent('Login');
      expect(navItems[2]).toHaveTextContent('Availability');
      expect(navItems[3]).toHaveTextContent('Presentation');
      expect(navItems[4]).toHaveTextContent('Prefill');
      expect(navItems[5]).toHaveTextContent('Variables');
      expect(navItems[6]).toHaveTextContent('Registration');
      expect(navItems[7]).toHaveTextContent('Confirmation');
      expect(navItems[8]).toHaveTextContent('Submissions');
      expect(navItems[9]).toHaveTextContent('Payment');
      expect(navItems[10]).toHaveTextContent('Data removal');
      expect(navItems[11]).toHaveTextContent('Translations');
      expect(navItems[12]).toHaveTextContent('History');

      // All menu items are visible and none are active
      navItems.forEach(navItem => {
        expect(navItem).toBeVisible();
        expect(navItem).not.toHaveAttribute('aria-current');
      });
    });
  },
};
