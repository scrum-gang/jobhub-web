import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";

import applicationsAPI from "../../api/applicationsAPI";

import {
  Button,
  createStyles,
  Divider,
  Grid,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { format } from "timeago.js";

import { AuthRedirect, Protection } from "../../Shared/Authorization";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: "auto",
      marginTop: 80,
      maxWidth: 600,
      padding: theme.spacing.unit * 4
    }
  });

export enum Posting {
  
}

const data = {
  _id: "123123",
  company: "JobHub",
  deadline: new Date(),
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  location: "Montreal, Quebec",
  position: "Software Developer",
  posted: new Date(),
  salary: 60000
};

const ViewPosting: React.FunctionComponent<WithStyles & RouteComponentProps> = ({ classes }) => {
  const applyToPosting = (values: {_id: string}) => {
    // TODO [aungur]: Collect `resume` and `comment` from user
    return applicationsAPI
      .createInternalApplication({job_id: values._id, resume: "123", comment: ""})
      .then(response => {
        // TODO
        if ('status' in response.data){
          toast.error(response.data['status']);
        }
        else{
          toast.success("Response!");
        }
      })
      .catch(error => {
        toast.error("Error!");
      })
      .finally(() => {
        toast.info("Finally!");
      });
  };

  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.LOGGED_IN} />
      <Paper className={classes.container}>
        <Typography variant="h3" component="h1">
          {data.position}
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          {data.company}
        </Typography>
        <Divider />
        <Typography variant="h6" gutterBottom>
          ${data.salary} - {data.location}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {data.description}
        </Typography>
        <Grid container justify="space-between">
          <Typography component="span">Posted {format(data.posted)}</Typography>
          <Typography component="span">
            Deadline {format(data.deadline)}
          </Typography>
        </Grid>
        <Grid container justify="center">
          <Button onClick={() => applyToPosting(data)} color="primary" variant="contained">
            Apply
          </Button>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(ViewPosting);
