import * as Yup from "yup";

const deleteAccountSchema = Yup.object().shape({
  password: Yup.string()
    .min(6)
    .required()
});

export default deleteAccountSchema;
