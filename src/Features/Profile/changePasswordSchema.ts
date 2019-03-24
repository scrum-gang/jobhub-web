import * as Yup from "yup";

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6)
    .required(),
  newPassword: Yup.string()
    .min(6)
    .required()
    .notOneOf(
      [Yup.ref("oldPassword"), null],
      "New password must not be the same as old one."
    ),
  confirm: Yup.string()
    .min(6)
    .required()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match.")
});

export default changePasswordSchema;
