import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../DataBases/entities/userModel";
import { getRepository } from "typeorm";
interface UserPayload {
  User_id: number;
}
export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getRepository(User);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: "token is missing",
    });
  }
  const [, token] = authorization.split(" ");
  if (!token) {
    return res.status(401).json({
      response: "Token is missing",
    });
  }
  try {
    const verifed = jwt.verify(
      token,
      process.env.SECRET as string
    ) as UserPayload;
    return next();
  } catch {
    return res.status(401).json({
      response: "Token is invalid",
    });
  }
};
