import {
  Theme,
  createStyles,
  WithStyles,
  Grid,
  withStyles,
  Typography,
  Button,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Icon,
  List,
  ListItem,
  ListItemText,
  ExpansionPanelSummary,
  ExpansionPanel,
  ExpansionPanelDetails
} from "@material-ui/core";
import React from "react";
import { AuthRedirect, Protection } from "../../Shared/Authorization";
import userAPI from "../../api/userAPI";
import AuthorizationContext from "../../Shared/Authorization/Context";
import { Formik, Form, Field, FormikActions } from "formik";
import { toast } from "react-toastify";
import editProfileSchema from "./editProfileSchema";
import UserType from "../../config/types/accountTypes";
import { TextField } from "formik-material-ui";
import { AccountCircle, KeyboardArrowDown } from "@material-ui/icons";
import deleteAccountSchema from "./deleteAccountSchema";
import changePasswordSchema from "./changePasswordSchema";

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      margin: 50,
      width: 100,
      height: 100,
      alignSelf: "center"
    },
    icon: {
      width: 110,
      height: 110,
      alignSelf: "center"
    },
    buttonsGrid: {
      marginTop: theme.spacing.unit
    },
    grid: {
      height: "100vh",
      padding: 0,
      width: "100%",
      justifyContent: "center"
    },
    accountContainer: {
      maxWidth: 800,
      padding: 6 * theme.spacing.unit,
      width: "90%",
      justifyContent: "center"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      padding: 0
    }
  });

const Profile: React.FunctionComponent<WithStyles> = ({ classes }) => {
  const { userInfo } = React.useContext(AuthorizationContext);

  const handleEdit = (
    values: {
      email: string;
    },
    actions: FormikActions<any>
  ) => {
    return userAPI
      .update({
        email: values.email,
        password: (userInfo && userInfo.password) || "",
        type: (userInfo && userInfo.type) || UserType.UNKNOWN
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        toast.success("Changes saved.");
        actions.setSubmitting(false);
      });
  };

  const handleChangePassword = (
    values: {
      oldPassword: string;
      newPassword: string;
      confirm: string;
    },
    actions: FormikActions<any>
  ) => {
    return userAPI
      .login({
        email: (userInfo && userInfo.email) || "",
        password: (userInfo && values.oldPassword) || ""
      })
      .then(() => {
        return userAPI
          .update({
            email: (userInfo && userInfo.email) || "",
            password: values.newPassword,
            type: (userInfo && userInfo.type) || UserType.UNKNOWN
          })
          .then(() => {
            toast.success("Password successfully changed.");
          })
          .catch(error => {
            toast.error(error.response.data.message);
          });
      })
      .catch(error => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const handleDelete = (
    values: {
      password: string;
    },
    actions: FormikActions<any>
  ) => {
    return userAPI
      .login({
        email: (userInfo && userInfo.email) || "",
        password: (userInfo && values.password) || ""
      })
      .then(() => {
        return userAPI
          .delete()
          .then(() => {
            toast.success("Account deleted.");
          })
          .catch(error => {
            toast.error(error.response.data.message);
          });
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
        <Paper className={classes.accountContainer}>
          <Avatar className={classes.avatar}>
            <Icon className={classes.icon}>
              <AccountCircle className={classes.icon} />
            </Icon>
          </Avatar>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<KeyboardArrowDown />}>
              <Typography className={classes.heading}>
                Account Details
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Formik
                initialValues={{
                  email: (userInfo && userInfo.email) || ""
                }}
                validationSchema={editProfileSchema}
                onSubmit={handleEdit}
              >
                <Form>
                  <Grid container justify="space-around" direction="column">
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="email"
                      label="Email"
                      type="email"
                      margin="dense"
                    />
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classes.buttonsGrid}
                    >
                      Save
                    </Button>
                  </Grid>
                </Form>
              </Formik>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<KeyboardArrowDown />}>
              <Typography className={classes.heading}>
                Change Password
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  confirm: ""
                }}
                validationSchema={changePasswordSchema}
                onSubmit={handleChangePassword}
              >
                <Form>
                  <Grid container justify="space-around" direction="column">
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="oldPassword"
                      label="Old Password"
                      type="password"
                      margin="dense"
                    />
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="newPassword"
                      label="New Password"
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
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classes.buttonsGrid}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Form>
              </Formik>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<KeyboardArrowDown />}>
              <Typography className={classes.heading}>
                Delete Account
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Are you sure you want to delete your account? All data
                pertaining to it will be wiped from JobHub's servers.
              </Typography>
              <Formik
                initialValues={{
                  password: ""
                }}
                validationSchema={deleteAccountSchema}
                onSubmit={handleDelete}
              >
                <Form>
                  <Grid container justify="space-around" direction="column">
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="password"
                      label="Password"
                      type="password"
                      margin="dense"
                    />
                  </Grid>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="secondary"
                    className={classes.buttonsGrid}
                  >
                    Delete
                  </Button>
                </Form>
              </Formik>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Profile);
