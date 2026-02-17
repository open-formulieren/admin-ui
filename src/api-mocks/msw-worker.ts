import {setupWorker} from 'msw/browser';

// set up API mock server
const mswWorker = setupWorker();

export default mswWorker;
