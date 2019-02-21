import * as React from "react";

import {
  CircularProgress,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core";

const styles = createStyles({
  container: {
    alignItems: "center",
    background: "white",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    width: "100vw",
    zIndex: 1000
  }
});

const LoadingSpinner: React.FunctionComponent<WithStyles> = ({ classes }) => (
  <div className={classes.container}>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(LoadingSpinner);
