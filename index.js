const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./Middlewares');
const { readCrushFile } = require('./Services');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

// 1 - Crie o endpoint POST /login

app.post('/login', middlewares.login);

// 2 - Crie o endpoint POST /crush

app
  .route('/crush')
  .post(
    middlewares.authToken,
    middlewares.validateCrush,
    middlewares.addNewCrush,
  )
  .get(
    // 3 - Crie o endpoint GET /crush
    middlewares.authToken,
    middlewares.getAllCrushes,
  );

// app.ro

app.listen(PORT, () => console.log(`We're in. Port ${PORT}`));
