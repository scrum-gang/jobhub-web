import * as React from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  createStyles,
  Grid,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

import { AuthRedirect, Protection } from "../../Shared/Authorization";

import JobImage from "../../assets/job.svg";

const styles = createStyles({
  main: {
    margin: "0 auto",
    marginTop: 200
  }
});

const Dashboard: React.FunctionComponent<WithStyles> = ({ classes }) => {
  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.IS_APPLICANT} />
      <Grid className={classes.main}>
        <img style={{ width: "400px", height: "auto" }} src={JobImage} />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Dashboard);
