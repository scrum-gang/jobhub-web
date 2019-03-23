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
  withStyles
} from "@material-ui/core";
import { Add as PlusIcon, Remove as MinusIcon } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import { TextField as TextFieldFormik } from "formik-material-ui";
import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import applicationsAPI from "../../api/applicationsAPI";

const styles = (theme: Theme) =>
  createStyles({
    buttonsGrid: {
      marginTop: theme.spacing.unit
    },
    dividerMargin: {
      marginTop: 10
    },
    formContainer: {
      maxWidth: 600,
      padding: 6 * theme.spacing.unit
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

  useEffect(() => {
    console.log(id);
  }, []);

  const setInitialValues = () => {
    return false;
  };

  const decreaseInterviewCount = () => {
    if (interviewCount > 0) {
      setInterviewCount(interviewCount - 1);
    }
  };

  const increaseInterviewCount = () => {
    if (interviewCount < 6) {
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
            disabled={disabled}
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
            disabled={disabled}
          />
        </Grid>
        <Divider variant="middle" className={classes.dividerMargin} />
      </div>
    );
  };

  return (
    <Paper className={classes.formContainer}>
      <Formik
        initialValues={{}}
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
          {Array.from(Array(interviewCount).keys()).map(i =>
            renderQuestion(i, false)
          )}
          <Grid container spacing={24} className={classes.buttonsGrid}>
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
              <Button size="large" variant="contained" type="button" fullWidth>
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
    </Paper>
  );
};

export default withStyles(styles)(withRouter(ApplicationCommentInterview));
