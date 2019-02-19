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

const styles = createStyles({
  card: {
    minHeight: 250
  },
  main: {
    margin: "0 auto",
    marginTop: 100,
    maxWidth: 800
  }
});

const Dashboard: React.FunctionComponent<WithStyles> = ({ classes }) => {
  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.LOGGED_IN} />
      <Grid container className={classes.main} spacing={32}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography variant="overline" component="h2" gutterBottom>
                  My Applications
                </Typography>
                <Typography>0 applications submitted</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography variant="overline" component="h2">
                  JobHub Postings
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography variant="overline" component="h2">
                  Resumes
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Dashboard);
