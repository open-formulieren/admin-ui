import {AdminSettingsContext} from './context';

export interface AdminSettingsProviderProps {
  environment?: string;
  children?: React.ReactNode;
}

const AdminSettingsProvider: React.FC<AdminSettingsProviderProps> = ({environment, children}) => (
  <AdminSettingsContext.Provider value={{environment}}>{children}</AdminSettingsContext.Provider>
);

export default AdminSettingsProvider;
