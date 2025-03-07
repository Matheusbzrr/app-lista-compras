const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(422)
      .json({ msg: "Dados inválidos!", errors: result.error.issues });
  }
  next();
};

module.exports = validate;
