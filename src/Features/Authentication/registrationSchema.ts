import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
  confirm: Yup.string() //tslint:disable-line
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required")
});

export default registrationSchema;
