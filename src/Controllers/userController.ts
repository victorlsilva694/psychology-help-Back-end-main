import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../DataBases/entities/userModel";

interface UserPayload {
  User_id: number;
}
export const userLoggin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ where: { Email: email } });
  if (!user) {
    return res.status(401).json({
      message: "email ou senha inválido",
    });
  }
  const isMatch = await bcrypt.compare(password, user.Password);
  if (!isMatch) {
    return res.status(401).json({
      message: "email ou senha inválido",
    });
  }
  const token = jwt.sign(
    {
      User_id: user.id,
    },
    process.env.SECRET as string,
    {
      expiresIn: "7h",
    }
  );
  res.send({
    token,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userRepository = getRepository(User);
  console.log(name, email, password);
  console.log(req.file?.filename)
  var Hash = await bcrypt.hash(password, 12);
  const user = userRepository.create({
    Name: name,
    Email: email,
    Password: Hash,
    ImagePath: req.file?.filename
  });
  await userRepository.save(user);
  return res.status(201).json({
    user,
  });
};

export const verifyToken = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { authorization } = req.headers;
  if (authorization) {
    const [, token] = authorization.split(" ");
    if (token) {
      const verifed = jwt.verify(
        token,
        process.env.SECRET as string
      ) as UserPayload;
      if (verifed.User_id) {
        const searchUser = await userRepository.findOne({
          where: {
            id: verifed.User_id,
          },
        });
        console.log(searchUser)
        if (searchUser) {
          const { Email, Name, id, ImagePath } = searchUser;
          res.json({
            Email,
            Name,
            id,
            ImagePath
          });
          return;
        }
      }
    }
  }
  res.status(404).json({
    message: "user not found",
  });
};
