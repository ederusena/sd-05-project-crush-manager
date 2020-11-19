const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const crypto = require('crypto');
const middlewares = require('./middlewares');

const app = express();
const PORT = 3000;
const token = crypto.randomBytes(8).toString('hex');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.logger, (_req, res, _next) => {
  res.status(200).json({ token });
});

app.post('/crush', middlewares.auth, middlewares.dataFormat, async (req, res, _next) => {
  const { name, age, date } = req.body;
  const crushFile = await fs.readFile('./crush.json', 'utf-8');
  const id = crushFile.length + 1;
  JSON.parse(crushFile);
  await fs.writeFile('./crush.json', JSON.stringify([...crushFile, id, name, age, date]));
  res.status(201).json({
    id,
    name,
    age,
    date,
  });
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
