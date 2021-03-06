import {
  createStyles,
  Grid,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import React, { ReactNode } from "react";

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
  <Grid
    container
    spacing={0}
    direction="row"
    alignItems="center"
    justify="center"
  >
    <Paper
      elevation={4}
      style={{
        marginBottom: "10%",
        marginLeft: "10%",
        marginRight: "15%",
        marginTop: "10%",
        padding: 100
      }}
    >
      <Typography variant="headline" component="h3">
        {title}
      </Typography>
      {children}
    </Paper>
  </Grid>
);

export default withStyles(styles)(Wrapper);
