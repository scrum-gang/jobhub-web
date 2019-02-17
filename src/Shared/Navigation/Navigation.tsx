import * as React from "react";

import {
  AppBar,
  createStyles,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import {
  Attachment as AttachmentIcon,
  Extension as ExtensionIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  PowerSettingsNew as LogoutIcon,
  Search as SearchIcon,
  Work as WorkIcon
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        flexShrink: 0,
        width: drawerWidth
      }
    },
    drawerPaper: {
      width: drawerWidth
    },
    link: {
      textDecoration: "none"
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    root: {
      display: "flex"
    },
    toolbar: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      ...theme.mixins.toolbar
    }
  });

interface IProps extends WithStyles<typeof styles> {}

const Navigation: React.FunctionComponent<IProps> = ({ classes, children }) => {
  const drawerItems = [
    {
      icon: <HomeIcon />,
      route: "/",
      text: "Home"
    },
    {
      icon: <WorkIcon />,
      route: "/",
      text: "My Applications"
    },
    {
      icon: <SearchIcon />,
      route: "/",
      text: "JobHub Postings"
    },
    {
      icon: <AttachmentIcon />,
      route: "/",
      text: "Resumé"
    },
    {
      icon: <ExtensionIcon />,
      route: "/",
      text: "Chrome Extension"
    },
    {
      icon: <LogoutIcon />,
      route: "/",
      text: "Log Out"
    }
  ];

  const drawer = (
    <React.Fragment>
      <div className={classes.toolbar}>
        <Typography variant="h4" component="h1" align="center" color="primary">
          JobHub
        </Typography>
      </div>
      <Divider />
      <List>
        {drawerItems.map(({ icon, route, text }) => (
          <Link to={route} key={text} className={classes.link}>
            <ListItem button>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </React.Fragment>
  );

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {children}
    </div>
  );
};

export default withStyles(styles)(Navigation);
