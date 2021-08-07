const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const helmet = require('helmet');
const todosRouter = require('./src/routers/todos');



app.use(helmet());
app.use(express.static('client/src'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(todosRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
