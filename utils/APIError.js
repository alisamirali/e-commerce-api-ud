// @desc: Custom Error class for handling errors
// @usage: throw new APIError('message', statusCode)
// @params: message, statusCode
// @return: Error Object

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

module.exports = APIError;
