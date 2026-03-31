import React from 'react';

export interface AdminSettings {
  /**
   * Configuration for the Open Forms environment.
   *
   * The configuration is based on the OF backend environment variables for the
   * environment name and badge colors.
   * See https://open-forms.readthedocs.io/en/stable/installation/config.html#other-settings
   */
  environmentInfo: {
    label: string;
    showBadge: boolean;
    backgroundColor?: string;
    foregroundColor?: string;
  };
  /**
   * The base URLs of the Open Forms API.
   */
  apiBaseUrls: {
    v2: string;
    v3: string;
  };
  /**
   * The configuration of the Open Forms Django URLs.
   */
  djangoUrls: {
    generalConfiguration: string;
    adminLogin: string;
    publicRoot: string;
  };
}

const AdminSettingsContext = React.createContext<AdminSettings>({
  environmentInfo: {label: '', showBadge: true},
  apiBaseUrls: {v2: '', v3: ''},
  djangoUrls: {generalConfiguration: '', adminLogin: '', publicRoot: ''},
});

AdminSettingsContext.displayName = 'AdminSettingsContext';

export {AdminSettingsContext};
