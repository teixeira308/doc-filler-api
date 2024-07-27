import { body } from "express-validator";

export const personCreateValidation = () => {
  return [
    body("nome")
      .isString()
      .withMessage("O nome é obrigatório."),
      body("email")
      .optional()
      .isEmail()
      .withMessage("O email é obrigatório e deve ser válido."),
    body("cpf")
      .optional()
      .isString()
      .withMessage("O CPF deve ser uma string.")
      .isLength({ min: 11, max: 11 })
      .withMessage("O CPF deve ter 11 dígitos."),
    body("rg")
      .optional()
      .isString()
      .withMessage("O RG deve ser uma string.")
      .isLength({ min: 7, max: 15 })
      .withMessage("O RG deve ter entre 7 e 15 caracteres."),
  ];
};