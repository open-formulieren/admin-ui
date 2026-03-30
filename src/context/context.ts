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
   * The base URL of the Open Forms API.
   */
  apiBaseUrl: string;
  /**
   * The configuration of the Open Forms Django URLs.
   */
  djangoUrls: {
    generalConfiguration: string;
    adminLogin: string;
  };
}

const AdminSettingsContext = React.createContext<AdminSettings>({
  environmentInfo: {label: '', showBadge: true},
  apiBaseUrl: '',
  djangoUrls: {generalConfiguration: '', adminLogin: ''},
});

AdminSettingsContext.displayName = 'AdminSettingsContext';

export {AdminSettingsContext};
