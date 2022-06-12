if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
};
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'));
app.use(cors());
//routes
app.get('/', (req, res) => {
  res.send({ res: 'Welcome to API MIC Transformer'});
})
app.use(routes);
//error handler
// app.use(errorHandler);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('URL Not Found')
  err.status = 400;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
});

app.listen(port, () => {
  console.log(`App is listening at port: ${port}`)
});