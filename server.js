// server.js
const Hapi = require('@hapi/hapi');
const songRoutes = require('./routes/songRoutes');
const albumRoutes = require('./routes/albumRoutes');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route([...songRoutes, ...albumRoutes]);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
