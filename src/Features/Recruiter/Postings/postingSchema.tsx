import * as Yup from "yup";

const postingSchema = Yup.object().shape({
  company: Yup.string().required(),
  deadline: Yup.date().required(),
  description: Yup.string().required(),
  end_date: Yup.date().required(),
  location: Yup.string().required(),
  recruiter: Yup.string().required(),
  requirements: Yup.string().required(),
  salary: Yup.number().required(),
  start_date: Yup.date().required(),
  title: Yup.string().required(),
});

export default postingSchema;
