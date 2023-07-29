import { rest } from 'msw';

export const handlers = [
  // Sample code
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    );
  }),

  // Sample code
  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    );
  }),

  rest.post('https://rpc.ankr.com/eth', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ jsonrpc: '2.0', id: 1, result: '0x3E8' }), // 1000
    );
  }),

  rest.get('/foobar', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        foo: 'foo',
        bar: 'bar',
      }),
    );
  }),
];
