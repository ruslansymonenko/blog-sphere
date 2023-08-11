import bcrypt from "bcryptjs";

const SALT = parseInt(process.env.SALT);

export const hidePassword = (password) => {

  const salt = bcrypt.genSaltSync(SALT);

  const hashPasword = bcrypt.hashSync(password, salt);

  return hashPasword;
};

export const checkPassword = (passwordToCheck, userPassword) => {
  return bcrypt.compareSync(passwordToCheck, userPassword);
};