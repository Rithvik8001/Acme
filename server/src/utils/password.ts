import bcrypt from "bcrypt";

const hashPasswoord = async (password: string) => {
  const result = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
  return result;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

export { hashPasswoord, comparePassword };
