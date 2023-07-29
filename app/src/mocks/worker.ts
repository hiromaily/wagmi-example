export {};

// const options: any = {
//   onUnhandledRequest: 'error',
// }

if (typeof window === 'undefined') {
  // enable msw worker by dynamic import
  const mockServer = () =>
    import('./server').then((mock) => {
      mock.server.listen();
    });
  mockServer();
} else {
  // enable msw worker by dynamic import
  const mockWorker = () =>
    import('./browser').then((mock) => {
      mock.worker.start();
    });
  mockWorker();
}
