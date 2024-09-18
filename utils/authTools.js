import { sign, verify } from "jsonwebtoken";

function generateToken(data, processEnvKey) {
  const token = sign(data, processEnvKey);
  return token;
}

function verifyToken(token, processEnvKey) {
  try {
    const validationToken = verify(token, processEnvKey);
    return validationToken;
  } catch (error) {
    return false;
  }
}
export { generateToken, verifyToken };
