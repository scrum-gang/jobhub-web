import * as Yup from "yup";
import UserType from "../../config/types/accountTypes";

const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
  confirm: Yup.string() //tslint:disable-line
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required"),
  type: Yup.string()
    .oneOf(Object.values(UserType))
    .required()
});

export default registrationSchema;
