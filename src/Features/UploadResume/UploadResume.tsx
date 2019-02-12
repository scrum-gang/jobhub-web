import * as React from "react";

import {
  Button,
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { CloudUpload, Menu } from "@material-ui/icons";

import { AuthRedirect, Protection } from "../../Shared/Authorization";

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
    icon: {
      color: "#1e90ff" ,
      fontSize: "inherit",
      height: "auto",
      margin: theme.spacing.unit,
      width: "70%"
    },
    margin: {
      margin: theme.spacing.unit
    },
    paper: {
      height: "60%",
      maxWidth: "300px",
      padding: `${6 * theme.spacing.unit}px ${12 * theme.spacing.unit}px`,
      width: "40%"
    },
    text: {
      fontSize: "3vw"
    },
    textField: {
      width: 250
    }
  });

interface IProps extends WithStyles<typeof styles> {}

const UploadResume: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    // <React.Fragment>
    //   <AuthRedirect protection={Protection.LOGGED_IN} />
    //     <h1>WIP</h1>
    // </React.Fragment>

    <Grid
      container
      className={classes.grid}
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <Grid container justify="center">
          <CloudUpload className={classes.icon}/>
          <Typography component="h2" variant="h4" gutterBottom>
            Drag and drop files
          </Typography>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
          >
            Browse
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default withStyles(styles)(UploadResume);
