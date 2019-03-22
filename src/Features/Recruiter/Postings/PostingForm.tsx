import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  createStyles,
  Grid,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Field, Form, Formik, FormikActions } from "formik";
import { TextField } from "formik-material-ui";

import postingsAPI, { IPosting } from "../../../api/postingsAPI";

const styles = (theme: Theme) =>
  createStyles({
    buttonsGrid: {
      marginTop: theme.spacing.unit
    },
    formContainer: {
      maxWidth: 600,
      padding: 6 * theme.spacing.unit
    },
    fullHeight: {
      marginTop: 100
    }
  });

export enum Modes {
  CREATE,
  EDIT
}

interface IProps extends WithStyles {
  mode: Modes;
  handleClose?: () => void;
}

const PostingForm: React.FunctionComponent<IProps & RouteComponentProps> = ({
  classes,
  mode,
  handleClose,
  history
}) => {
  if (!handleClose) {
    handleClose = () => {
      history.push("/recruiter");
    };
  }

  const initialValues: IPosting = {
    company: "",
    deadline: new Date().toISOString().split('T')[0],
    description: "",
    end_date: new Date().toISOString().split('T')[0],
    location: "",
    recruiter: "tester123",
    requirements: "",
    salary: "",
    start_date: new Date().toISOString().split('T')[0],
    title: "",
  };

  const handleSubmit = async (
    values: IPosting,
    actions: FormikActions<any>
  ) => {
    try {
      await postingsAPI.createPosting(values);
    } catch (e) {
      toast.error(e);
      console.error(e);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Paper className={classes.formContainer}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Grid container justify="center" direction="column">
            <Typography
              component="h1"
              variant="h2"
              color="primary"
              gutterBottom
            >
              {mode === Modes.EDIT ? "Edit" : "Create"} Posting
            </Typography>
            <Field
              name="title"
              type="text"
              label="title"
              variant="outlined"
              margin="dense"
              component={TextField}
            />
            <Field
              name="company"
              type="text"
              label="company"
              variant="outlined"
              margin="dense"
              component={TextField}
            />
            <Field
              name="description"
              type="text"
              label="description"
              variant="outlined"
              margin="dense"
              component={TextField}
            />
            <Field
              name="requirements"
              type="text"
              label="requirements"
              variant="outlined"
              margin="dense"
              component={TextField}
            />
            <Field
              name="salary"
              type="text"
              label="salary"
              variant="outlined"
              margin="dense"
              component={TextField}
            />
            <Field
              name="deadline"
              type="date"
              label="deadline"
              margin="dense"
              variant="outlined"
              component={TextField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Field
              name="start_date"
              type="date"
              label="start"
              margin="dense"
              variant="outlined"
              component={TextField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Field
              name="end_date"
              type="date"
              label="end"
              margin="dense"
              variant="outlined"
              component={TextField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Grid container spacing={16} className={classes.buttonsGrid}>
              <Grid item xs={12} sm={6}>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  size="large"
                  variant="contained"
                  type="button"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Paper>
  );
};

export default withStyles(styles)(withRouter(PostingForm));
