import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    margin: {
        margin: theme.spacing.unit
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow: 1,
      height: "70vh"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    card: {
        
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

export interface Props extends WithStyles<typeof styles> {}

interface State {
  email: String,
  password: String
}

  class Login extends React.Component<Props, State> {
      state = {
          email: 'test@gmail.com',
          password: '123'
      };

      render() {
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