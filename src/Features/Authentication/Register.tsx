import * as React from "react";
import { toast } from "react-toastify";

import {
  Button,
  createStyles,
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
import { Field, Form, Formik, FormikActions } from "formik";
import { Select, TextField } from "formik-material-ui";

import userAPI from "../../api/userAPI";
import UserType from "../../config/types/accountTypes";
import { AuthRedirect, Protection } from "../../Shared/Authorization";
import ConfirmMessage from "./ConfirmMessageModal";
import registrationSchema from "./registrationSchema";

const styles = (theme: Theme) =>
  createStyles({
    buttonsGrid: {
      marginTop: theme.spacing.unit
    },
    grid: {
      height: "100vh",
      padding: 0,
      width: "100%"
    },
    registerContainer: {
      maxWidth: 400,
      padding: 6 * theme.spacing.unit,
      width: "90%"
    }
  });

interface IProps extends WithStyles<typeof styles> {}

const Register: React.FunctionComponent<IProps> = ({ classes }) => {
  const [isRegistered, setRegistered] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = (
    values: {
      email: string;
      password: string;
      type: UserType;
      confirm: string;
    },
    actions: FormikActions<any>
  ) => {
    setEmail(values.email);
    return userAPI
      .register({
        email: values.email,
        password: values.password,
        type: values.type
      })
      .then(response => {
        setRegistered(true);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <React.Fragment>
      {isRegistered && <ConfirmMessage email={email} />}
      <AuthRedirect protection={Protection.LOGGED_OUT} />
      <Grid
        container
        className={classes.grid}
        justify="center"
        alignItems="center"
      >
        <Paper className={classes.registerContainer}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirm: "",
              type: UserType.APPLICANT
            }}
            validationSchema={registrationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container justify="space-around" direction="column">
                <Typography
                  component="h1"
                  variant="h4"
                  color="primary"
                  align="center"
                  gutterBottom
                >
                  Register
                </Typography>
                <Field
                  component={TextField}
                  variant="outlined"
                  name="email"
                  label="Email"
                  type="email"
                  margin="dense"
                />
                <Field
                  component={TextField}
                  variant="outlined"
                  name="password"
                  label="Password"
                  type="password"
                  margin="dense"
                />
                <Field
                  component={TextField}
                  variant="outlined"
                  name="confirm"
                  label="Confirm Password"
                  type="password"
                  margin="dense"
                />
                <FormControl variant="outlined" margin="dense">
                  <InputLabel htmlFor="type-simple">type</InputLabel>
                  <Field
                    name="type"
                    margin="dense"
                    component={Select}
                    input={
                      <OutlinedInput
                        labelWidth={30}
                        name="type"
                        id="type-simple"
                      />
                    }
                  >
                    <MenuItem value={UserType.APPLICANT}>Applicant</MenuItem>
                    <MenuItem value={UserType.RECRUITER}>Recruiter</MenuItem>
                  </Field>
                </FormControl>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.buttonsGrid}
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
};

export default withStyles(styles)(Register);
