const ToJson = (schema, pluginOtp) => {
  let transform;

  if (schema.options?.toJSON?.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = {
    ...(schema.options.toJSON || {}),
    transform(doc, ret, options) {
      ret.id = ret._id;
      [...(pluginOtp?.hidden || []), '_id', '__v'].forEach((it) => delete ret[it]);
      return transform && transform(doc, ret, options);
    },
  };
};

module.exports = ToJson;
