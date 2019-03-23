import * as React from "react";

import { Field, Form, Formik, FormikActions } from "formik";
import { Select, TextField } from "formik-material-ui";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";

import applicationsAPI from "../../api/applicationsAPI";
import resumesAPI from "../../api/resumesAPI";

import {
  Button,
  CircularProgress,
  createStyles,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { format } from "timeago.js";

import { AuthRedirect, Protection } from "../../Shared/Authorization";
import AuthorizationContext from "../../Shared/Authorization/Context";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: "auto",
      marginTop: 80,
      maxWidth: 600,
      padding: theme.spacing.unit * 4
    }
  });


const data = {
  _id: "123123123",
  company: "JobHub",
  deadline: new Date(),
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  location: "Montreal, Quebec",
  position: "Software Developer",
  posted: new Date(),
  salary: 60000
};

const ViewPosting: React.FunctionComponent<WithStyles & RouteComponentProps> = ({ classes }) => {
  const [userResumes, setUserResumes] = React.useState([]);
  const { userInfo } = React.useContext(AuthorizationContext);
  const [ isLoading, setIsLoading ] = React.useState(false);

  const applyToPosting = async (
    values: { _id: string; comment: string; resume: string },
    actions: FormikActions<any>
  ) => {

    setIsLoading(true);
    return applicationsAPI
      .createInternalApplication({job_id: values._id, resume: values.resume, comment: values.comment})
      .then(response => {
        if ('status' in response.data){
          setIsLoading(false);
          toast.error(response.data.status);
        }
        else if ('status' in response.data[0]){
          setIsLoading(false);
          toast.error(response.data.status);
        } else{
          setIsLoading(false);
          toast.success("Applied!");
        }
      })
      .catch(error => {
        setIsLoading(false);
        toast.error("Error!");
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  React.useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    if (userInfo) {
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;

      setUserResumes(result || []);
    }
  };

  const getSubmitButton = () => {
    if (!isLoading) {
      return <Button type="submit" color="primary" variant="contained" > Apply </Button>;
    } else {
      return <CircularProgress />;
    }
  }

  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.LOGGED_IN} />
      <Paper className={classes.container}>
        <Typography variant="h3" component="h1">
          {data.position}
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          {data.company}
        </Typography>
        <Divider />
        <Typography variant="h6" gutterBottom>
          ${data.salary} - {data.location}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {data.description}
        </Typography>
        <Grid container justify="space-between">
          <Typography component="span">Posted {format(data.posted)}</Typography>
          <Typography component="span">
            Deadline {format(data.deadline)}
          </Typography>
        </Grid>
        <br></br>
        <Formik
              initialValues={{ _id: data._id, resume: "", comment: "" }}
              validationSchema={null}
              onSubmit={applyToPosting}
            >
        <Form>
          <Grid container justify="center">
            <Field
              name="comment"
              type="text"
              label="Comment"
              variant="outlined"
              margin="dense"
              component={TextField}
            />
            <FormControl variant="outlined" margin="dense">
              <InputLabel htmlFor="resume-simple">resume</InputLabel>
              <Field
                name="resume"
                margin="dense"
                component={Select}
                input={
                  <OutlinedInput
                    labelWidth={45}
                    name="resume"
                    id="resume-simple"
                  />
                }
              >
                {!!userResumes &&
                  userResumes.map((resume: any) => (
                    <MenuItem value={resume.download_resume_url}>
                      {`${resume.title} (${resume.revision})`}
                    </MenuItem>
                  ))}
              </Field>
            </FormControl>
          </Grid>
          <Grid container justify="center">
            {getSubmitButton()}
          </Grid>
        </Form>
        </Formik>
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(ViewPosting);
