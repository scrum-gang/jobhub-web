import * as Yup from "yup";

const changePasswordSchema = Yup.object().shape({
  confirm: Yup.string()
    .min(6)
    .required()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match."),
  newPassword: Yup.string()
    .min(6)
    .required()
    .notOneOf(
      [Yup.ref("oldPassword"), null],
      "New password must not be the same as old one."
    ),
  oldPassword: Yup.string()
    .min(6)
    .required()
});

export default changePasswordSchema;
