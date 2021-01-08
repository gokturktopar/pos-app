const getResponse = (err) => {
  return {
    status: err.status,
    message: err.message,
  };
};

const backendError = ({err, status, message}) => {
  status = status || 400;
  message = message || err?.message || "Backend Error";
  return {
    status,
    message,
  };
};


module.exports = {
  BackendError: backendError,
  getResponse,
};
