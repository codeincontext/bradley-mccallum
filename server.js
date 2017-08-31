// NOTE: We only need a custom server.js for the project/:slug route

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/project/:slug', (req, res) =>
    app.render(
      req,
      res,
      '/project',
      Object.assign({ slug: req.params.slug }, req.query)
    )
  );

  server.get('*', (req, res) => handle(req, res));

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
