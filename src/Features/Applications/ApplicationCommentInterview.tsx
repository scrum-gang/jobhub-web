import {
  Button,
  CircularProgress,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Icon,
  Paper,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Add as PlusIcon, Remove as MinusIcon } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import { TextField as TextFieldFormik } from "formik-material-ui";
import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import applicationsAPI from "../../api/applicationsAPI";
import AuthorizationContext from "../../Shared/Authorization/Context";

const styles = (theme: Theme) =>
  createStyles({
    buttonMargin: {
      marginBottom: theme.spacing.unit
    },
    buttonsGrid: {
      marginTop: 2 * theme.spacing.unit
    },
    dividerMargin: {
      marginTop: theme.spacing.unit
    },
    formContainer: {
      maxWidth: 800,
      padding: 6 * theme.spacing.unit
    },
    inputWidth: {
      width: 400
    },
    titleInputMargin: {
      marginTop: theme.spacing.unit
    },
    titleMargin: {
      marginTop: theme.spacing.unit
    }
  });

export enum Modes {
  CREATE,
  EDIT
}

interface IProps extends WithStyles {
  id?: number;
}

const ApplicationCommentInterview: React.FunctionComponent<
  IProps & RouteComponentProps
> = ({ id, classes, history }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [interviewCount, setInterviewCount] = React.useState(0);
  const [initialValues, setInitialValuesForm] = React.useState<any>({});
  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const { userInfo } = React.useContext(AuthorizationContext);
  const INTERVIEW_QUESTIONS_LIMIT = 6;

  useEffect(() => {
    fetchInterviewQuestions();
  }, []);

  const fetchInterviewQuestions = async () => {
    setIsLoadingData(true);

    if (id && userInfo) {
      try {
        const resultInterviewQuestions = (await applicationsAPI.getInterviewQuestionsForApplication(
          `${id}`
        )).data;

        const resultApplicationData = (await applicationsAPI.getSingleApplication(
          `${id}`
        )).data;

        const interviewInitialValues: any = {};

        resultInterviewQuestions.forEach((el: any, i: number) => {
          interviewInitialValues[`title-${i}`] = el.title;
          interviewInitialValues[`question-${i}`] = el.question;
        });

        setInitialValuesForm({
          comment: resultApplicationData.comment,
          ...interviewInitialValues
        });

        setInterviewCount(resultInterviewQuestions.length);
      } catch (e) {
        toast.error(`Failed to fetch application data`);
      }
    }

    setIsLoadingData(false);
  };

  const getInitialNumberOfInterviewQuestions = () => {
    return Object.keys(initialValues).filter(key => key.startsWith(`title`))
      .length;
  };

  const decreaseInterviewCount = () => {
    if (interviewCount > getInitialNumberOfInterviewQuestions()) {
      setInterviewCount(interviewCount - 1);
    }
  };

  const increaseInterviewCount = () => {
    if (interviewCount < INTERVIEW_QUESTIONS_LIMIT) {
      setInterviewCount(interviewCount + 1);
    }
  };

  const handleSubmit = async (values: any) => {
    if (id) {
      const commentPayload = { new_comment: values.comment || "", id };

      try {
        const result = await applicationsAPI.updateComment(commentPayload);
      } catch (e) {
        toast.error(`Failed to add a comment`);
      }

      Promise.all(
        [...Array(interviewCount)].map(async (_, i) => {
          // we only create new interview questions, so we ignore the ones
          // that are there for display (the disabled inputs)
          if (!initialValues[`question-${i}`]) {
            const interviewPayload = {
              application_id: id,
              question: values[`question-${i}`] || "",
              title: values[`title-${i}`] || ""
            };

            try {
              const result = await applicationsAPI.createInterviewQuestion(
                interviewPayload
              );
            } catch (e) {
              toast.error(`Failed to add ${i}-th question`);
            }
          }
        })
      );

      history.push(`/applications/`);
    }
  };

  const handleCancel = () => {
    history.push(`/applications/`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (id) {
      try {
        const result = await applicationsAPI.deleteApplication({ id });
        history.push(`/applications/`);
      } catch (e) {
        toast.error(`Failed to delete application`);
        handleCloseDialog();
      }
    }
  };

  const renderQuestion = (num: number, disabled: boolean) => {
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          className={classes.titleInputMargin}
        >
          <Field
            name={`title-${num}`}
            type="text"
            label="title"
            variant="outlined"
            margin="dense"
            component={TextFieldFormik}
            disabled={initialValues[`title-${num}`]}
            required={!initialValues[`title-${num}`]}
            className={classes.inputWidth}
          />
          <Field
            name={`question-${num}`}
            type="text"
            label="question"
            variant="outlined"
            margin="dense"
            multiline
            rows="4"
            component={TextFieldFormik}
            disabled={initialValues[`question-${num}`]}
            required={!initialValues[`question-${num}`]}
            className={classes.inputWidth}
          />
        </Grid>
        <Divider variant="middle" className={classes.dividerMargin} />
      </div>
    );
  };

  const renderForm = () => {
    if (isLoadingData) {
      return <CircularProgress />;
    } else {
      return (
        <Formik
          initialValues={initialValues}
          onSubmit={async values => handleSubmit(values)}
        >
          <Form>
            <Typography gutterBottom variant="h5" component="h2">
              Comment
            </Typography>
            <Field
              name="comment"
              type="text"
              label="comment"
              variant="outlined"
              margin="dense"
              multiline
              rows="4"
              component={TextFieldFormik}
              required
              className={classes.inputWidth}
            />
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.titleMargin}
            >
              <Typography gutterBottom variant="h5" component="h2">
                Interviews
              </Typography>
              <Grid item direction="row" justify="space-between">
                <PlusIcon onClick={increaseInterviewCount} />
                <MinusIcon onClick={decreaseInterviewCount} />
              </Grid>
            </Grid>
            {[...Array(interviewCount)].map((_, i) => renderQuestion(i, false))}
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.buttonsGrid}
            >
              <Button
                size="large"
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                className={classes.buttonMargin}
              >
                Save
              </Button>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                type="button"
                fullWidth
                onClick={handleOpenDialog}
                className={classes.buttonMargin}
              >
                Delete
              </Button>
              <Button
                size="large"
                color="default"
                variant="contained"
                fullWidth
                className={classes.buttonMargin}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Application Delete"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this application? This action
                  will permanently erase all of the the data associated to it.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </Formik>
      );
    }
  };

  return <Paper className={classes.formContainer}>{renderForm()}</Paper>;
};

export default withStyles(styles)(withRouter(ApplicationCommentInterview));
