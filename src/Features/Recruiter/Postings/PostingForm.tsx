import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

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
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

const styles = (theme: Theme) =>
  createStyles({
    buttonsGrid: {
      marginTop: theme.spacing.unit
    },
    formContainer: {
      maxWidth: 400,
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
      history.push("/recruiter/postings");
    };
  }

  const initialValues =
    mode === Modes.EDIT
      ? {
          company: "JobHub",
          deadline: "2019-06-06",
          position: "Developer",
          status: "Applied"
        }
      : {};
  return (
    <Paper className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}
      >
        <Form>
          <Grid container justify="center" direction="column">
            <Typography
              component="h1"
              variant="h2"
              color="primary"
              gutterBottom
            >
              {mode === Modes.EDIT ? "Edit" : "Create"} Application
            </Typography>
            <Field
              name="position"
              type="text"
              label="position"
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
