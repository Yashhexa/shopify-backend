// Create a middleware function to handle errors
const errorHandler = (err, req, res, next) => {
  // Check if the error is a Sequelize validation error
  const statusCode = res.statusCode ? res.statusCode : 500;
  if (err.name === 'SequelizeValidationError') {
    // Extract the error messages from the validation error
    const errorMessages = err.errors.map(error => ({
      field: error.path,
      message: error.message
    }));

    // Send the error messages as JSON response
    return res.status(400).send({ errors: errorMessages });
  }
  else if (statusCode == 404) {
    console.error(err);
    return res.status(404).send({ error: 'Not Found.' });
  }
  else {
    // Handle other types of errors
    console.error(err);
    return res.status(500).send({ error: 'An unexpected error occurred.' });
  }
};

module.exports = errorHandler;