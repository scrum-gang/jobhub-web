import { Card, createStyles, Theme, withStyles, WithStyles} from '@material-ui/core';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    
  });

export interface IProps extends WithStyles<typeof styles> { }

interface IState {
  resume: string
}

class UploadResume extends React.Component<IProps, IState> {

  public render() {
    return (
      <div>
        <h1>upload</h1>
      </div>
    )
  }
  
}

export default withStyles(styles)(UploadResume);
