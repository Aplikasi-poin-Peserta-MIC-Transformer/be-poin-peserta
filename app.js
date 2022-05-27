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
app.use(routes);
//error handler
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is listening at port: ${port}`)
});