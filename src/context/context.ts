import React from 'react';

export interface AdminSettings {
  /**
   * The environment name of the Open Forms instance.
   */
  environment?: string;
}

const AdminSettingsContext = React.createContext<AdminSettings>({});

AdminSettingsContext.displayName = 'AdminSettingsContext';

export {AdminSettingsContext};
