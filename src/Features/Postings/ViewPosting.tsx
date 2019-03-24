import React, { useContext, useEffect, useState } from "react";

import { Field, Form, Formik, FormikActions } from "formik";
import { Select, TextField } from "formik-material-ui";
import { RouteComponentProps, withRouter } from "react-router-dom";
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

import postingsAPI, { IPosting2 } from "../../api/postingsAPI";
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

const ViewPosting: React.FunctionComponent<
  WithStyles & RouteComponentProps
> = ({ classes, location }) => {
  const { userInfo } = useContext(AuthorizationContext);
  const [posting, setPosting] = useState<IPosting2 | undefined>(undefined);
  const [userResumes, setUserResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState(false);

  const handleSubmit = async (
    values: { _id: string; comment: string; resume: string },
    actions: FormikActions<any>
  ) => {
    setIsLoading(true);
    return applicationsAPI
      .createInternalApplication({
        comment: values.comment,
        job_id: values._id,
        resume: values.resume
      })
      .then(response => {
        if ("status" in response.data) {
          toast.error(response.data.status);
        } else {
          toast.success("Applied!");
          setHasAlreadyApplied(true);
        }

        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        toast.error(error.message);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetchPosting();
    fetchResumes();
  }, []);

  React.useEffect(() => {
    fetchApplication();
  }, [posting]);

  const fetchResumes = async () => {
    if (userInfo) {
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;

      setUserResumes(result || []);
    }
  };

  const fetchPosting = async () => {
    const id = location.pathname.split("/")[2];
    const { data } = await postingsAPI.getPostingById(id);
    setPosting(data);
  };

  const fetchApplication = async () => {
    if (userInfo && posting) {
      // if single application is implemented
      // const result = (await applicationsAPI.getSinglePostingApplication(
      //   data._id
      // )).data;

      // setHasAlreadyApplied(result.job_id);

      // if this job is already part of our applications
      // TODO: MAKE SURE TO REPLACE `data._id` WITH ACTUAL DATA PROPS FOR WHEN FECTHING
      // JOB POSTING DATA
      const result = (await applicationsAPI.getApplicationsUser()).data.filter(
        (el: any) => el.job_id && el.job_id === posting._id
      );

      setHasAlreadyApplied(result.length !== 0);
      setIsLoading(false);
    }
  };

  const getSubmitButton = () => {
    if (!isLoading && hasAlreadyApplied) {
      return <Typography>You've already applied to this posting!</Typography>;
    } else if (!isLoading) {
      return (
        <Button type="submit" color="primary" variant="contained">
          Apply
        </Button>
      );
    } else {
      return <CircularProgress />;
    }
  };

  if (posting) {
    return (
      <React.Fragment>
        <AuthRedirect protection={Protection.IS_APPLICANT} />
        <Paper className={classes.container}>
          <Typography variant="h3" component="h1">
            {posting.title}
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            {posting.company}
          </Typography>
          <Divider />
          <Typography variant="h6" gutterBottom>
            ${posting.salary} - {posting.location}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {posting.description}
          </Typography>
          <Grid container justify="space-between">
            <Typography component="span">
              Posted {format(posting.posting_date)}
            </Typography>
            <Typography component="span">
              Deadline {format(posting.deadline)}
            </Typography>
          </Grid>
          <br />
          <Formik
            initialValues={{ _id: posting._id, resume: "", comment: "" }}
            validationSchema={null}
            onSubmit={handleSubmit}
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
                        <MenuItem
                          value={resume.download_resume_url}
                          key={resume.download_resume_url}
                        >
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
  } else {
    return <CircularProgress />;
  }
};

export default withRouter(withStyles(styles)(ViewPosting));
