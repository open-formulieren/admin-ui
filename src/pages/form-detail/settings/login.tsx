import {Column, Grid, H2, P, Tab, Tabs} from '@maykin-ui/admin-ui';
import {useQuery} from '@tanstack/react-query';
import {FormattedMessage} from 'react-intl';

import {BASE_URL} from '@/api-mocks';
import {Toggle} from '@/components/form/Toggle';
import type {AuthenticationPlugin} from '@/types/authenticationPlugin';
import {apiCall} from '@/utils/fetch';

const MOST_USED_IDS = ['digid', 'digid_oidc', 'eherkenning', 'eherkenning_oidc'] as const;
const OTHER_IDS = [
  'digid_machtigen_oidc',
  'eherkenning_bewindvoering_oidc',
  'eidas',
  'eidas_oidc',
  'eidas_company_oidc',
  'org-oidc',
  'yivi_oidc',
] as const;
const TEST_IDS = ['demo-outage', 'bsn-outage', 'kvk-outage', 'digid-mock', 'demo-kvk'] as const;

const LoginSettingsPage: React.FC = () => {
  const {data: plugins = []} = useQuery<AuthenticationPlugin[]>({
    queryKey: ['authentication-plugins'],
    queryFn: () => apiCall(`${BASE_URL}v2/authentication/plugins`).then(r => r.json()),
  });

  const pluginsById = Object.fromEntries(plugins.map(p => [p.id, p]));

  const renderToggle = (id: string) => {
    const plugin = pluginsById[id];
    if (!plugin) return null;
    const label = (
      <FormattedMessage
        description="form detail login settings toggle label with providesAuth"
        defaultMessage="{pluginLabel} (biedt {providesAuth} aan)"
        values={{
          pluginLabel: plugin.label,
          providesAuth: plugin.providesAuth.join(', '),
        }}
      />
    );
    return <Toggle key={plugin.id} name={plugin.id} label={label} />;
  };

  return (
    <Grid>
      <Column span={12} mobileSpan={12}>
        <H2>
          <FormattedMessage
            description="form detail login settings page title"
            defaultMessage="Inloggen"
          />
        </H2>
        <P>
          <FormattedMessage
            description="form detail login settings page authentication description"
            defaultMessage="Selecteer de toegestane authenticatie-plugins om in te loggen aan het begin van het formulier"
          />
        </P>
        <Tabs>
          <Tab label="Meest gebruikte methodes">
            {/* <P></P> */}
            {MOST_USED_IDS.map(renderToggle)}
            <P>
              <FormattedMessage
                description="form detail login settings automatic redirect description"
                defaultMessage="Selecteer naar welke authenticatiemethode de gebruiker automatisch doorgestuurd moet worden"
              />
            </P>
            {renderToggle('demo')}
          </Tab>
          <Tab label="Overige methodes">
            {OTHER_IDS.map(renderToggle)}
            <P>
              <FormattedMessage
                description="form detail login settings automatic redirect description"
                defaultMessage="Selecteer naar welke authenticatiemethode de gebruiker automatisch doorgestuurd moet worden"
              />
            </P>
            {renderToggle('demo')}
          </Tab>
          <Tab label="Test methodes">
            {TEST_IDS.map(renderToggle)}
            <P>
              <FormattedMessage
                description="form detail login settings automatic redirect description"
                defaultMessage="Selecteer naar welke authenticatiemethode de gebruiker automatisch doorgestuurd moet worden"
              />
            </P>
            {renderToggle('demo')}
          </Tab>
        </Tabs>
      </Column>
    </Grid>
  );
};

export default LoginSettingsPage;
