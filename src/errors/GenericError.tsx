import {Banner} from '@maykin-ui/admin-ui';
import {useIntl} from 'react-intl';

import ErrorMessage from '@/errors/ErrorMessage';
import type {AnyError} from '@/errors/exceptions';

interface GenericErrorProps {
  error: AnyError;
}

const GenericError: React.FC<GenericErrorProps> = ({error}) => {
  const intl = useIntl();
  return (
    <>
      <Banner
        title={intl.formatMessage({
          description: "'Generic' error title",
          defaultMessage: 'Oops!',
        })}
        description={intl.formatMessage({
          description: "'Generic' error message",
          defaultMessage: 'Unfortunately something went wrong!',
        })}
        variant="danger"
        withIcon
      />
      <ErrorMessage error={error} />
    </>
  );
};

export default GenericError;
