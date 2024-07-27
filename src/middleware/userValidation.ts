import { body } from "express-validator";

export const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório."),
    body("email")
    .isString()
    .withMessage("O email é obrigatório."),
    body("password")
    .isString()
    .withMessage("O password é obrigatório."),
   
  ];
};