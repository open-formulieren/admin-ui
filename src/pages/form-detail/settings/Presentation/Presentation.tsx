import {Column, Grid, H2, P} from '@maykin-ui/admin-ui';
import {useQuery} from '@tanstack/react-query';
import {FormattedMessage} from 'react-intl';

import {BASE_URL} from '@/api-mocks';
import {Checkbox, Select} from '@/components/form';
import FormButtonsPreview from '@/components/preview/FormButtonsPreview';
import type {Theme} from '@/types/theme';
import {apiCall} from '@/utils/fetch';

import './Presentation.scss';

const PresentationPage: React.FC = () => {
  const {data = []} = useQuery<Theme[]>({
    queryKey: ['form-themes'],
    queryFn: () => apiCall(`${BASE_URL}v2/themes`).then(res => res.json()),
  });

  const themeOptions = data.map(theme => ({
    value: theme.uuid,
    label: theme.name,
  }));

  return (
    <div className="openforms-page-presentation">
      <Grid>
        <Column span={5} mobileSpan={12}>
          <H2>
            <FormattedMessage
              description="form detail presentation settings page title"
              defaultMessage="Presentation"
            />
          </H2>
          <Select
            name="theme"
            label={
              <FormattedMessage
                description="Form detail field 'theme' label"
                defaultMessage="Theme"
              />
            }
            options={themeOptions}
          />
          <Checkbox
            name="showProgressIndicator"
            label={
              <FormattedMessage
                description="Form detail field 'showProgressIndicator' label"
                defaultMessage="Show step progression next to the form"
              />
            }
          />
          <Checkbox
            name="showSummaryProgress"
            label={
              <FormattedMessage
                description="Form detail field 'showSummaryProgress' label"
                defaultMessage="Show current step number and total amount of steps below the form title"
              />
            }
          />

          <P size="md">
            <FormattedMessage
              description="Form detail presentation settings form buttons preview description"
              defaultMessage={`The buttons in the form use global settings. The buttons
              below are a preview of the buttons that will be used in the form. To change
              the button labels, click the 'Edit buttons' button below.`}
            />
          </P>
          <FormButtonsPreview className="openforms-page-presentation__form-buttons-preview" />
        </Column>
      </Grid>
    </div>
  );
};

export default PresentationPage;
