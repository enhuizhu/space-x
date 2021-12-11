import { rest } from 'msw';
import { setupServer } from 'msw/node'


export const mockerServer = setupServer(
  rest.get('https://api.spacexdata.com/v3/launches', (req, res, ctx) => {
    return res(ctx.json(require('./launces.json')));
  })
)