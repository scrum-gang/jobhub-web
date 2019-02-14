import React from "react";
import { Link } from "react-router-dom";

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

import { AuthRedirect, Protection } from "../../Shared/Authorization";
import loginSchema from "./loginSchema";

const styles = (theme: Theme) =>
  createStyles({
    dense: {
      marginTop: 16
    },
    fullHeight: {
      minHeight: "100vh"
    },
    h1: {
      fontSize: "5rem",
      textAlign: "center"
    },
    loginContainer: {
      maxWidth: 400,
      padding: 6 * theme.spacing.unit,
      width: "90%"
    },
    margin: {
      margin: theme.spacing.unit
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
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
              variant="h1"
              color="primary"
              gutterBottom={true}
              className={classes.h1}
            >
              JobHub
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={values => {
                console.log(values);
              }}
            >
              <Form>
                <Grid container justify="center" direction="column">
                  <Field
                    name="email"
                    type="email"
                    label="email"
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    component={TextField}
                  />
                  <Field
                    name="password"
                    type="password"
                    label="password"
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    component={TextField}
                  />
                  <Button
                    size="large"
                    className={classes.margin}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Sign In
                  </Button>

                  <Button
                    className={classes.margin}
                    variant="contained"
                    component={RegistrationLink}
                    type="button"
                  >
                    Register
                  </Button>
                </Grid>
              </Form>
            </Formik>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Login);
