import * as React from "react";
import { Field, Form, Formik, FormikActions } from "formik";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { RouteComponentProps } from "react-router-dom";
import { TextField } from "formik-material-ui";
import { toast } from "react-toastify";
import applicationsAPI from "../../api/applicationsAPI";

import {
  Button,
  createStyles,
  Divider,
  Grid,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { format } from "timeago.js";

import { AuthRedirect, Protection } from "../../Shared/Authorization";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: "auto",
      marginTop: 80,
      maxWidth: 600,
      padding: theme.spacing.unit * 4
    }
  });

export enum Posting {
  
}

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
  const applyToPosting = (
    values: { _id: string; comment: string; resume: string },
    actions: FormikActions<any>
  ) => {
    return applicationsAPI
      .createInternalApplication({job_id: values._id, resume: values.resume, comment: values.comment})
      .then(response => {
        // TODO
        if ('status' in response.data){
          toast.error(response.data['status']);
        }
        else if ('status' in response.data[0]){
          toast.error(response.data[0]['status']);
        } else{
          toast.success("Applied!");
        }
      })
      .catch(error => {
        toast.error("Error!");
      })
      .finally(() => {
        // TODO: Anything needed here ... ?
      });
  };

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
        <Formik
              initialValues={{ _id: data._id, resume: "", comment: "" }}
              validationSchema={""}
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
            <Field
              name="resume"
              type="dropdown"
              label="resume"
              value=""
              component={Select}
            >
              {["a", "b", "c", "d"].map((v, i) => <MenuItem key={i} value={v}> {v} </MenuItem>)}
            </Field>
            <Button color="primary" variant="contained">
              Apply
            </Button>
          </Grid>
        </Form>
        </Formik>
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(ViewPosting);
