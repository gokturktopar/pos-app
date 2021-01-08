const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const posRouter = require('./routes/pos');
const customerRouter = require('./routes/customer');
const paymentRouter = require('./routes/payment');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/pos', posRouter);
app.use('/api/customers', customerRouter);
app.use('/api/payments', paymentRouter);

/**Swagger */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc/swagger.json');
app.use('/doc', swaggerUi.serve);
app.get('/doc', swaggerUi.setup(swaggerDocument));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.json({
    message: err.message,
    name: err.name,
    statusCode: err.statusCode || 500
  });
});

module.exports = app;
