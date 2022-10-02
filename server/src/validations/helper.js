const fields = [
  'any.default',
  'any.failover',
  'any.invalid',
  'any.only',
  'any.ref',
  'any.required',
  'any.unknown',
  'string.alphanum',
  'string.base',
  'string.base64',
  'string.creditCard',
  'string.dataUri',
  'string.domain',
  'string.email',
  'string.empty',
  'string.guid',
  'string.hex',
  'string.hexAlign',
  'string.hostname',
  'string.ip',
  'string.ipVersion',
  'string.isoDate',
  'string.isoDuration',
  'string.length',
  'string.lowercase',
  'string.max',
  'string.min',
];

const setErrorMessages = (message) => {
  const result = {};
  fields.map((field) => (result[field] = message));
  return result;
};

module.exports = setErrorMessages;
