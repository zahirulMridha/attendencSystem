const error = (status = 500, msg = "utils error") => {
  const err = new Error(msg);
  err.status = status;
  return err;
};
module.exports = error;
