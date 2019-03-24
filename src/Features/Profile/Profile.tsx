import {
  Theme,
  createStyles,
  WithStyles,
  Grid,
  withStyles,
  Typography,
  Button,
  IconButton,
  TextField,
  Paper
} from "@material-ui/core";
import React from "react";
import { AuthRedirect, Protection } from "../../Shared/Authorization";
import { AccountCircle, Edit } from "@material-ui/icons";
import userAPI from "../../api/userAPI";
import AuthorizationContext from "../../Shared/Authorization/Context";
import { Formik, Form, Field, FormikActions } from "formik";
import { toast } from "react-toastify";
import editProfileSchema from "./editProfileSchema";
import UserType from "../../config/types/accountTypes";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: "auto",
      marginTop: 80,
      minWidth: 300,
      maxWidth: 600
    },
    card: {
      minWidth: 275,
      alignItems: "center"
    },
    largeIcon: {
      width: 120,
      height: 120,
      color: "primary"
    },
    heading: {
      flexBasis: "33.33%"
    },
    textField: {
      width: 300
    },
    resize: {
      fontSize: 50
    },
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

const Profile: React.FunctionComponent<WithStyles> = ({ classes }) => {
  const { userInfo } = React.useContext(AuthorizationContext);
  const [userData, setUserData] = React.useState([]);
  const [isInEditMode, setEditMode] = React.useState(false);
  const [email, setEmail] = React.useState(userInfo && userInfo.email);

  const handleEdit = (
    values: {
      email: string;
      password: string;
    },
    actions: FormikActions<any>
  ) => {
    setEmail(values.email);
    return userAPI
      .update({
        email: values.email,
        password: values.password,
        type: (userInfo && userInfo.type) || UserType.UNKNOWN
      })
      .then(response => {
        toast.success("We did it");
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
      <AuthRedirect protection={Protection.LOGGED_IN} />
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
              password: ""
            }}
            validationSchema={editProfileSchema}
            onSubmit={handleEdit}
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
                  Edit
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
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.buttonsGrid}
                >
                  Save
                </Button>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Profile);
