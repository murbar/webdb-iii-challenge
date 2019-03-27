const express = require('express');
const helmet = require('helmet');
const cohorts = require('./routes/cohorts');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/cohorts', cohorts);

const port = 4000;

server.listen(port, function() {
  console.log(`\n--- Server listening on http://localhost:${port} ---\n`);
});
