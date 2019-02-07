import * as React from "react";

import {
  Button,
  createStyles,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginTop: 20
    },
    grid: {
      height: "100vh",
      padding: 0,
      width: "100%"
    },
    margin: {
      margin: theme.spacing.unit
    },
    paper: {
      maxWidth: "600px",
      padding: `${6 * theme.spacing.unit}px ${12 * theme.spacing.unit}px`
    },
    textField: {
      width: 250
    }
  });

interface IProps extends WithStyles<typeof styles> {}

const Register: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <Grid
      container
      className={classes.grid}
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <form>
          <Grid container justify="space-around" direction="column">
            <Typography component="h2" variant="h4" gutterBottom>
              Register
            </Typography>
            <TextField
              id="email"
              className={classes.textField}
              variant="outlined"
              label="Email"
              margin="dense"
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              margin="dense"
              type="password"
            />
            <TextField
              id="confirm"
              variant="outlined"
              label="Confirm Password"
              type="password"
              margin="dense"
            />
            <TextField
              id="github"
              variant="outlined"
              label="GitHub URL"
              margin="dense"
            />
            <TextField
              id="linkedin"
              variant="outlined"
              label="LinkedIn URL"
              margin="dense"
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default withStyles(styles)(Register);
