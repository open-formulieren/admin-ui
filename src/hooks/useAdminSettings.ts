import {useContext} from 'react';

import {AdminSettingsContext} from '@/context/context';

export const useAdminSettings = () => useContext(AdminSettingsContext);
