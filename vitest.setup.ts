import {setProjectAnnotations} from '@storybook/react-vite';
import * as reactIntlAnnotations from 'storybook-react-intl/preview';
import {afterAll, afterEach, beforeAll} from 'vitest';

import {mswWorker} from '@/api-mocks';

import * as projectAnnotations from './.storybook/preview';

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([reactIntlAnnotations, projectAnnotations]);

beforeAll(async () => {
  annotations.beforeAll();
  // set up HTTP mocks
  await mswWorker.start({onUnhandledRequest: 'error'});
});
afterEach(() => mswWorker.resetHandlers());
afterAll(() => mswWorker.stop());
