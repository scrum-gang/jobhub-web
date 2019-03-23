import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import {
  createStyles,
  Grid,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";

import { AuthRedirect, Protection } from "../../Shared/Authorization";
import ApplicationCommentInterview from "./ApplicationCommentInterview";
import ApplicationForm from "./ApplicationForm";

export enum Modes {
  CREATE,
  EDIT
}

interface IProps extends WithStyles {
  mode: Modes;
}

const initialValues = {};

const styles = (theme: Theme) =>
  createStyles({
    fullHeight: {
      marginTop: 100
    }
  });

const OpenApplication: React.FunctionComponent<
  IProps & RouteComponentProps
> = ({ classes, location }) => {
  const pathname = location.pathname.split("/");
  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.LOGGED_IN} />
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.fullHeight}
      >
        {/* Hacky, I know, but should work as long as
        the structure isn't changed.  If there's a cleaner way 
        to do this with react router let me know  */}

        <ApplicationCommentInterview
          id={parseInt(pathname[pathname.length - 1], 10)}
        />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(OpenApplication);
