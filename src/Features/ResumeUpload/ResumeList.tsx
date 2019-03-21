import {
  Avatar,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import React, {useState} from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from '@material-ui/icons/Folder';
import PropTypes from "prop-types";

const styles = (theme:any) => ({
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

const ResumeList = (props: any) => {
  const { classes } = props;

  function generate(element:any) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {/* <Grid item > */}
          
          <div className={classes.demo}>
            <List>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
      {/* </Grid> */}
    </div>
  );
};

ResumeList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResumeList);
