import * as React from "react";

import {
  createStyles,
  Grid,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

interface IProps extends WithStyles<typeof styles> {
  callToAction: React.ReactNode;
  title?: string;
  message?: string;
  imageSource: string;
}

const styles = (theme: Theme) =>
  createStyles({
    centered: {
      textAlign: "center"
    },
    image: {
      height: "auto",
      width: 200
    },
    paper: {
      margin: "0 auto",
      padding: theme.spacing.unit * 8,
    }
  });

const MessagePage: React.FunctionComponent<IProps> = ({
  callToAction,
  classes,
  imageSource,
  message,
  title
}) => {
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="column"
        alignContent="center"
        spacing={32}
        justify="center"
      >
        <Grid item className={classes.centered}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="primary"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">{message}</Typography>
        </Grid>
        <Grid item className={classes.centered}>
          <img src={imageSource} className={classes.image} />
        </Grid>
        <Grid item>{callToAction}</Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(MessagePage);
