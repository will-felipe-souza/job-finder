const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function() {
  console.log(`O Express está rodando na porta ${PORT}`);
});

// body parser, para usar o body das requisições
app.use(bodyParser.urlencoded({extended: false}));

// handle bars
app.set('views', path.join(__dirname,'views')); //Onde ficará os tamplates
app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Arquivo principal das views
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db
  .authenticate()
  .then(() => {
    console.log('Conectou ao banco com sucesso')
  })
  .catch(err => {
    console.log('Ocorreu um erro ao conectar0', err)
  });

// routes
app.get('/', (req, res) => {
  res.render('index');
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));