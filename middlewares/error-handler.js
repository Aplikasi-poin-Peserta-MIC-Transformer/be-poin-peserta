const errorHandler = (err, req, res, next) => {
  if (err.status) {
      res.status(err.status).json({ message: err.message });
  } else if (err.name == `SequelizeValidationError` || err.name == `SequelizeUniqueConstraintError`) {
      let errors = [];
      for (let i = 0; i < err.errors.length; i++) {
          const element = err.errors[i];
          if (element.message == `username must be unique`) {
            errors.push(`Username is Already Registered`);
          } else {
              errors.push(element.message);
          }
      }
      let error = errors.join(', ');
      res.status(400).json({ message: error });
  } else {
      res.status(500).json({ message: `Internal Server Error` });
  }
}

module.exports = errorHandler