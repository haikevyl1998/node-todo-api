const { STATUS_CODES } = require('@/constants');

const Decorator = (err, req, res, next) => {
  const response = res.result
    ? {
        statusCode: res.result.statusCode || 200,
        code: res.result.code || STATUS_CODES.SUCCESS,
        ...(res.result.data && { data: res.result.data }),
        ...(res.result.paginationInfo && { paginationInfo: res.result.paginationInfo }),
      }
    : {
        code: err.code || STATUS_CODES.INTERNAL_SERVER_ERROR,
        statusCode: err.statusCode || 500,
      };

  const statusCode = response.statusCode;
  delete response.statusCode;

  res.status(statusCode).json(response);
};

module.exports = Decorator;
