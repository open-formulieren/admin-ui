import {Column, Grid, H2, P} from '@maykin-ui/admin-ui';
import {useQuery} from '@tanstack/react-query';
import {FormattedMessage} from 'react-intl';

import {BASE_URL} from '@/api-mocks';
import {Select} from '@/components/form/Select';
import {TextField} from '@/components/form/TextField';
import type {Category} from '@/types/category';
import {apiCall} from '@/utils/fetch';

const InformationPage: React.FC = () => {
  const {data = []} = useQuery<Category[]>({
    queryKey: ['form-categories'],
    queryFn: () => apiCall(`${BASE_URL}v2/categories`).then(r => r.json()),
  });

  const categoryOptions = data.map(category => {
    const ancestorLabels = (category.ancestors || []).map(ancestor => ancestor.name);
    return {
      value: category.uuid,
      label: [...ancestorLabels, category.name].join(' > '),
    };
  });

  return (
    <Grid>
      <Column span={5} mobileSpan={12}>
        <H2>
          <FormattedMessage
            description="form detail information settings page title"
            defaultMessage="Information"
          />
        </H2>
        <P>
          <FormattedMessage
            description="form detail information settings page 'only for admin' settings"
            defaultMessage="There settings are only visible for administrators"
          />
        </P>
        <Select
          name="category"
          label={
            <FormattedMessage
              description="Form detail field 'category' label"
              defaultMessage="Category"
            />
          }
          options={categoryOptions}
        />
        <TextField
          name="internalName"
          isRequired
          label={
            <FormattedMessage
              description="Form detail field 'internalName' label"
              defaultMessage="Internal name"
            />
          }
        />
        <TextField
          name="uuid"
          isReadOnly
          label={
            <FormattedMessage
              description="Form detail field 'uuid' label"
              defaultMessage="Unique ID"
            />
          }
        />
        <P>
          <FormattedMessage
            description="form detail information settings page 'also for citizen' settings"
            defaultMessage="These settings are also visible for citizens"
          />
        </P>
        <TextField
          name="slug"
          isRequired
          label={
            <FormattedMessage description="Form detail field 'slug' label" defaultMessage="Slug" />
          }
        />
      </Column>
    </Grid>
  );
};

export default InformationPage;
