/* eslint-disable no-console */
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import Helmet from 'react-helmet';
import Immutable from 'seamless-immutable';
// import path from 'path';
import React from 'react';
import routes from './routes';
import spdy from 'spdy';

//store
import { Provider } from 'react-redux';
import configure from './store/configure';

const isProd = process.env.NODE_ENV === "production";
const port = 3000;

// https: only in production
const options = {
  cert: fs.readFileSync(`${__dirname}/server/localhost-cert.pem`),
  key: fs.readFileSync(`${__dirname}/server/localhost-key.pem`),
  plain: !isProd,
  spdy: {
    plain: !isProd,
    protocols: ['h2', 'spdy/3.1', 'spdy/3', 'spdy/2', 'http/1.1', 'http/1.0'],
    ssl: isProd
  }
};

function renderFullPage(html, preloadedState) {
  const head = Helmet.rewind();

  return `
    <!doctype html>
      <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${head.title}
        ${head.meta}
        ${head.link}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src='/js/bundle.js' type='text/javascript'></script>
        <script src='/container.js' type='text/javascript'></script>
      </body>
    </html>
    `;
}

const app = express();
app.use(helmet());
app.use(express.static(`${__dirname}/public`));

const serviceWorkerFileOptions = {
  dotfiles: 'deny',
  headers: {
    'x-sent': true,
    'x-timestamp': Date.now(),
  },
  root: __dirname
};

app.get('/container.js', (req, res) => {
  res.sendFile('./container.js', serviceWorkerFileOptions, (err) => {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else console.log('Sent: container.js');
  });
});

app.get('/rootworker.js', (req, res) => {
  res.sendFile('./rootworker.js', serviceWorkerFileOptions, (err) => {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else console.log('Sent: rootworker.js');
  });
});

app.get("*", (req, res) => {
  const location = createLocation(req.url);
  match({ location, routes }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);

      return res.status(500).end('Internal server error');
    }
    if (!renderProps) return res.status(404).end('Not found.');
    //setup store based on data sent in
    const store = configure(Immutable({
      appError: { msg: '' },
      gotRandomSchedule: false,
      gotSchedules: {
        status: ''
      },
      gotStationInfo: {
        status: ''
      },
      gotStations: {
        status: ''
      },
      msg: 'Bart Train Scheduler',
      scheduleConfig: {
        depart: true
      },
    }));
    const initialState = store.getState();

    const InitialComponent = ( //eslint-disable-line no-extra-parens
      <Provider store={store} >
        <RouterContext {...renderProps} />
      </Provider>
    );
    const html = renderToString(InitialComponent);

    return res.status(200).send(renderFullPage(html, initialState));
  });

  return true;
});

spdy.createServer(options, app)
  .listen(port, (error) => { // eslint-disable-line consistent-return
    if (error) {
      console.error('error occured in spdy', error);

      return process.exit(1);
    }

    console.log(`Server running: ${isProd ? 'https://localhost' : 'http:://127.0.0.1'}:${port}`);
  });
