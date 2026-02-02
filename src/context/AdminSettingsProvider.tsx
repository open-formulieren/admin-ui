import {AdminSettingsContext} from './context';
import type {AdminSettings} from './context';

const AdminSettingsProvider: React.FC<React.PropsWithChildren<AdminSettings>> = ({
  environmentInfo,
  children,
}) => (
  <AdminSettingsContext.Provider value={{environmentInfo}}>
    {children}
  </AdminSettingsContext.Provider>
);

export default AdminSettingsProvider;
