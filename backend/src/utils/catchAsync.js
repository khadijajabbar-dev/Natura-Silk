// Express 4 does not automatically forward rejected promises from async
// route handlers to the error-handling middleware. Wrapping every controller
// with this makes sure a Mongo/Mongoose error (bad id, connection drop, etc.)
// always reaches server.js's error handler and returns a proper response
// instead of the request hanging forever.
export function catchAsync(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
