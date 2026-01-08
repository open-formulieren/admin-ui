import {expect, test} from 'vitest';
import {render} from 'vitest-browser-react';

import ExampleComponent from '@/ExampleComponent';

test('renders name', async () => {
  const {getByText} = await render(<ExampleComponent />);
  await expect.element(getByText('Hello World')).toBeVisible();
});
