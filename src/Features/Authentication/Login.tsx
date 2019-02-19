import React from "react";
import { Link } from "react-router-dom";
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

import userAPI from "../../api/userAPI";
import { AuthRedirect, Protection } from "../../Shared/Authorization";
import AuthorizationContext from "../../Shared/Authorization/Context";
import loginSchema from "./loginSchema";

const styles = (theme: Theme) =>
  createStyles({
    buttonsGrid: {
      marginTop: theme.spacing.unit
    },
    fullHeight: {
      minHeight: "100vh"
    },
    loginContainer: {
      maxWidth: 400,
      padding: 6 * theme.spacing.unit,
      width: "90%"
    }
  });

const RegistrationLink: React.FunctionComponent = props => (
  <Link to="/register" {...props} />
);

interface IProps extends WithStyles<typeof styles> {}

class Login extends React.Component<IProps> {
  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AuthRedirect protection={Protection.LOGGED_OUT} />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.fullHeight}
        >
          <Paper className={classes.loginContainer}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="primary"
              gutterBottom={true}
            >
              JobHub
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={this.handleSubmit}
            >
              <Form>
                <Grid container justify="center" direction="column">
                  <Field
                    name="email"
                    type="email"
                    label="email"
                    variant="outlined"
                    margin="dense"
                    component={TextField}
                  />
                  <Field
                    name="password"
                    type="password"
                    label="password"
                    variant="outlined"
                    margin="dense"
                    component={TextField}
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
                        Sign In
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        size="large"
                        variant="contained"
                        component={RegistrationLink}
                        type="button"
                        fullWidth
                      >
                        Register
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  private handleSubmit = (
    values: { email: string; password: string },
    actions: FormikActions<any>
  ) => {
    const context = this.context;
    return userAPI
      .login(values)
      .then(response => {
        return context.updateProvider(response);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };
}

Login.contextType = AuthorizationContext;

export default withStyles(styles)(Login);
