export const validate = (validatorFn) => (req, res, next) => {
  const errorMessage = validatorFn(req.body);
  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }
  next();
};