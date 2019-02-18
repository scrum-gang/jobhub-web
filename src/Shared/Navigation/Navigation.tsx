import * as React from "react";

import {
  AppBar,
  createStyles,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Link,
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
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      background: "transparent",
      boxShadow: "none",
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
      href: "https://github.com/scrum-gang/jobhub-chrome",
      icon: <ExtensionIcon />,
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
        {drawerItems.map(({ icon, route, text, href }) => {
          const listItem = (
            <ListItem button>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ variant: "overline" }}
              />
            </ListItem>
          );
          if (!!route) {
            return (
              <RouterLink to={route} key={text} className={classes.link}>
                {listItem}
              </RouterLink>
            );
          } else if (!!href) {
            return (
              <Link href={href} target="_blank" rel="noopener">
                {listItem}
              </Link>
            );
          }
        })}
      </List>
    </React.Fragment>
  );

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="primary"
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
