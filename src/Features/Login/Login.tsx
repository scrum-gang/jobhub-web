import { Button, Card, CardContent, createStyles, Grid, TextField, Theme, withStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    card: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: 12,
      paddingLeft: 12,
      paddingTop: 12,
    },
    container: {
      display: 'flex',
      flexGrow: 1,
      flexWrap: 'wrap',
      height: "70vh"
    },
    dense: {
      marginTop: 16,
    },
    margin: {
      margin: theme.spacing.unit
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    }
  });

export interface IProps extends WithStyles<typeof styles> { }

interface IState {
  email: string,
  password: string
}

class Login extends React.Component<IProps, IState> {
  public state = {
    email: 'test@gmail.com',
    password: '123'
  };

  public render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Card className={classes.card}>
            <CardContent>
              <Grid container justify="center" direction="column">
                <TextField
                  id="outlined-name"
                  label="Email"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  id="outlined-name"
                  label="Password"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
                <Button size="medium" className={classes.margin} color="primary" variant="contained">Sign In</Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </form>
    )
  }
}

export default withStyles(styles)(Login);