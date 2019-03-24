import {
  Theme,
  createStyles,
  WithStyles,
  Grid,
  Avatar,
  withStyles,
  Icon,
  Card,
  CardContent,
  Typography,
  ListItem,
  Button,
  IconButton,
  Fab,
  List,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  TextField
} from "@material-ui/core";
import React from "react";
import { AuthRedirect, Protection } from "../../Shared/Authorization";
import { AccountCircle, Edit } from "@material-ui/icons";
import userAPI from "../../api/userAPI";
import AuthorizationContext from "../../Shared/Authorization/Context";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: "auto",
      marginTop: 80,
      minWidth: 300,
      maxWidth: 600
    },
    card: {
      minWidth: 275,
      alignItems: "center"
    },
    largeIcon: {
      width: 120,
      height: 120,
      color: "primary"
    },
    heading: {
      flexBasis: "33.33%"
    },
    textField: {
      width: 300
    },
    resize: {
      fontSize: 50
    }
  });

const Profile: React.FunctionComponent<WithStyles> = ({ classes }) => {
  const { userInfo } = React.useContext(AuthorizationContext);
  const [userData, setUserData] = React.useState([]);
  const [isInEditMode, setEditMode] = React.useState(false);
  const [email, setEmail] = React.useState(userInfo && userInfo.email);

  const handleEditClick = () => {
    setEditSaveButton(
      !isInEditMode ? (
        <Button size="small" color="primary">
          Save
        </Button>
      ) : (
        <IconButton color="primary" onClick={handleEditClick}>
          <Edit />
        </IconButton>
      )
    );
    if (!isInEditMode) {
      setEditSaveButton;
    }
    setEditMode(!isInEditMode);
  };
  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };

  const [editSaveButton, setEditSaveButton] = React.useState(
    <IconButton color="primary" onClick={handleEditClick}>
      <Edit />
    </IconButton>
  );

  if (userInfo) {
    const user = userInfo;
  }
  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.LOGGED_IN} />
      <Grid className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Avatar className={classes.largeIcon}>
              <AccountCircle className={classes.largeIcon} />
            </Avatar>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<Edit />}>
                <Typography className={classes.heading}>Email</Typography>
                <Typography className={classes.heading}>
                  {userInfo && userInfo.email}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TextField
                  id="standard-name"
                  label="New Email"
                  className={classes.textField}
                  defaultValue={userInfo && userInfo.email}
                  fullWidth
                />
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary">
                  Save
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
            <List>
              <TextField
                id="outlined-read-only-input"
                label="Email"
                className={classes.textField}
                defaultValue={userInfo && userInfo.email}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isInEditMode,
                  input: classes.resize
                }}
                variant="outlined"
              />
              <IconButton color="primary" onClick={handleEditClick}>
                {editSaveButton}
              </IconButton>
            </List>

            <List>
              <ListItem>
                <ListItemText primary="Email" />
                <ListItemText primary={userInfo && userInfo.email} />
                <ListItemIcon>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
              <ListItem>
                <ListItemText primary="Password" />
                <ListItemText primary={userInfo && userInfo.password} />
                <ListItemIcon>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
              <ListItem>
                <ListItemText primary="Account Type" />
                <ListItemText primary={userInfo && userInfo.type} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Profile);
