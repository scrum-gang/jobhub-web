import React, { ReactNode } from "react";

import {
  createStyles,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    menu: {
      width: 200
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    }
  });

interface IProps extends WithStyles<typeof styles> {
  title: string;
  children: ReactNode;
}

const Wrapper = ({ title, children }: IProps) => (
  <Paper elevation={4} style={{ padding: 100 }}>
    <Typography variant="headline" component="h3">
      {title}
    </Typography>
    {children}
  </Paper>
);

export default withStyles(styles)(Wrapper);
