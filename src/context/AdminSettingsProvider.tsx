import {AdminSettingsContext} from './context';
import type {AdminSettings} from './context';

const AdminSettingsProvider: React.FC<React.PropsWithChildren<AdminSettings>> = ({
  apiBaseUrls,
  djangoUrls,
  environmentInfo,
  children,
}) => (
  <AdminSettingsContext.Provider value={{environmentInfo, djangoUrls, apiBaseUrls}}>
    {children}
  </AdminSettingsContext.Provider>
);

export default AdminSettingsProvider;
