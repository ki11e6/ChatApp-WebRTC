//express route async error handler so explicitly error need not to be passed though next()
//if promise resolves next middleware will be executed or catch will handle error
const asyncHandle = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandle;
