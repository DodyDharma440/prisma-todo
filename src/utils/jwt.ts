import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "test123";

export const generateToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, JWT_SECRET);
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
