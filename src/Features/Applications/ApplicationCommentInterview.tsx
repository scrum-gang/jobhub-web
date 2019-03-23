import {
  Button,
  createStyles,
  Divider,
  Grid,
  Icon,
  Paper,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles,
  CircularProgress
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
    buttonsGrid: {
      marginTop: theme.spacing.unit
    },
    dividerMargin: {
      marginTop: 10
    },
    formContainer: {
      maxWidth: 800,
      padding: 6 * theme.spacing.unit
    },
    inputWidth: {
      width: 400
    },
    titleInputMargin: {
      marginTop: 9
    },
    titleMargin: {
      marginTop: 10
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
              spacing={24}
            >
              <Grid item xs={8}>
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
              <Grid item xs={8}>
                <Button
                  size="large"
                  variant="contained"
                  type="button"
                  fullWidth
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      );
    }
  };

  return <Paper className={classes.formContainer}>{renderForm()}</Paper>;
};

export default withStyles(styles)(withRouter(ApplicationCommentInterview));
