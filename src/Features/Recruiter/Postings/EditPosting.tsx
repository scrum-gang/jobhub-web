import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import {
  createStyles,
  Grid,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";

import { AuthRedirect, Protection } from "../../../Shared/Authorization";
import PostingForm from "./PostingForm";

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

const EditApplication: React.FunctionComponent<
  IProps & RouteComponentProps
> = ({ classes }) => {
  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.IS_RECRUITER} />
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.fullHeight}
      >
        <PostingForm mode={Modes.EDIT} />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(EditApplication);
