import {
  Avatar,
  Button,
  colors,
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Icon,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { AccountCircle, KeyboardArrowDown } from "@material-ui/icons";
import { Field, Form, Formik, FormikActions } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import userAPI from "../../api/userAPI";
import UserType from "../../config/types/accountTypes";
import { AuthRedirect, Protection } from "../../Shared/Authorization";
import AuthorizationContext from "../../Shared/Authorization/Context";
import changePasswordSchema from "./changePasswordSchema";
import deleteAccountSchema from "./deleteAccountSchema";
import editProfileSchema from "./editProfileSchema";

const styles = (theme: Theme) =>
  createStyles({
    accountContainer: {
      justifyContent: "center",
      maxWidth: 800,
      padding: 6 * theme.spacing.unit,
      width: "90%"
    },
    avatar: {
      alignSelf: "center",
      height: 100,
      margin: -40,
      width: 100
    },
    buttonsGrid: {
      marginTop: theme.spacing.unit
    },
    deleteButton: {
      "&:hover": {
        backgroundColor: colors.red[900]
      },
      backgroundColor: colors.red[700],
      color: theme.palette.getContrastText(colors.red[500]),
      marginTop: theme.spacing.unit
    },
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      padding: 0
    },
    grid: {
      height: "100vh",
      justifyContent: "center",
      padding: 10,
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    icon: {
      alignSelf: "center",
      height: 110,
      width: 110
    }
  });

const Profile: React.FunctionComponent<WithStyles & RouteComponentProps> = ({
  classes,
  history
}) => {
  const { clearStateAndCache, userInfo } = React.useContext(
    AuthorizationContext
  );

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
            clearStateAndCache();
            history.push("/login");
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
        direction="column"
        wrap="nowrap"
      >
        <Avatar className={classes.avatar}>
          <Icon className={classes.icon}>
            <AccountCircle className={classes.icon} color="primary" />
          </Icon>
        </Avatar>
        <Paper className={classes.accountContainer}>
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
                  <Grid container justify="center" direction="column">
                    <Field
                      component={TextField}
                      variant="outlined"
                      name="email"
                      label="Email"
                      type="email"
                      margin="normal"
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
                Change Password
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Formik
                initialValues={{
                  confirm: "",
                  newPassword: "",
                  oldPassword: ""
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
              <Grid direction="column">
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
                      className={classes.deleteButton}
                    >
                      Delete
                    </Button>
                  </Form>
                </Formik>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(withRouter(Profile));
