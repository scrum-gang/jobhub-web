import * as Yup from "yup";

const editProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required()
});

export default editProfileSchema;
