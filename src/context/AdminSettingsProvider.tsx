import {AdminSettingsContext} from './context';
import type {AdminSettings} from './context';

const AdminSettingsProvider: React.FC<React.PropsWithChildren<AdminSettings>> = ({
  apiBaseUrl,
  environmentInfo,
  children,
}) => (
  <AdminSettingsContext.Provider value={{environmentInfo, apiBaseUrl}}>
    {children}
  </AdminSettingsContext.Provider>
);

export default AdminSettingsProvider;
