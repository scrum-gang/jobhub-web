import React from "react";

import {
  createStyles,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

const styles = () =>
  createStyles({
    root: {
      marginTop: 20,
      padding: 5
    }
  });

function replacer(_: string, value: any) {
  // Filtering out properties
  if (value instanceof File) {
    return {
      name: value.name,
      size: value.size,
      type: value.type
    };
  }
  return value;
}

interface IProps extends WithStyles<typeof styles> {
  values: any;
}

const FormValues = ({ values, classes }: IProps) => (
  <div className={classes.root}>
    <Typography variant="headline" component="h5">
      State
    </Typography>
    <Typography component="p">{JSON.stringify(values, replacer, 2)}</Typography>
  </div>
);

export default withStyles(styles)(FormValues);
