require('dotenv').config();
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const	consign	=	require('consign');
const morgan = require('morgan');
const path = require('path');
var app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use("/files", express.static(path.resolve(__dirname, 'temp', 'uploads')));
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.listen(3000, () => {console.log("Server running!")});

module.exports = app;
