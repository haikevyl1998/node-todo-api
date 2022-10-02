const { STATUS_CODES } = require('@/constants');

const Validator =
  ({ inputField = 'body', schema }) =>
  (req, res, next) => {
    const input = req[inputField];
    const result = schema.validate(input);
    if (result.error) {
      res.status(400).json({
        error: STATUS_CODES.BAD_REQUEST,
        code: result.error.message,
      });
    } else {
      req.data = {
        ...(req.data || {}),
        [inputField]: result.value,
      };
      next();
    }
  };

module.exports = Validator;
