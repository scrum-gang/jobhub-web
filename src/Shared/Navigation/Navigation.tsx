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
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import {
  AccountCircle,
  Attachment as AttachmentIcon,
  Extension as ExtensionIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Work as WorkIcon
} from "@material-ui/icons";
import {
  Link as RouterLink,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import userAPI from "../../api/userAPI";
import UserType from "../../config/types/accountTypes";
import { AuthConsumer } from "../../Shared/Authorization/";
import AuthorizationContext from "../../Shared/Authorization/Context";

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
    grow: {
      flexGrow: 1
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
    },
    toolbar2: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      ...theme.mixins.toolbar,
      [theme.breakpoints.up("sm")]: {
        justifyContent: "flex-end"
      }
    }
  });

const recruiterDrawerItems = [
  {
    icon: <WorkIcon />,
    route: "/recruiter",
    text: "My Postings"
  }
];
const applicationDrawerItems = [
  {
    icon: <HomeIcon />,
    route: "/",
    text: "Home"
  },
  {
    icon: <WorkIcon />,
    route: "/applications",
    text: "My Applications"
  },
  {
    icon: <SearchIcon />,
    route: "/postings",
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
  }
];

const Navigation: React.FunctionComponent<WithStyles & RouteComponentProps> = ({
  classes,
  children,
  history
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(null);

  const { userInfo } = React.useContext(AuthorizationContext);

  const drawerItems: any[] =
    userInfo && userInfo.type === UserType.APPLICANT
      ? applicationDrawerItems
      : recruiterDrawerItems;

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
              <Link href={href} key={text} target="_blank" rel="noopener">
                {listItem}
              </Link>
            );
          }
        })}
      </List>
    </React.Fragment>
  );

  const handleMenuOpen = (event: React.SyntheticEvent) => {
    setMenuAnchor(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar2}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <IconButton
              aria-owns={!!menuAnchor ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={menuAnchor}
              anchorOrigin={{
                horizontal: "right",
                vertical: "top"
              }}
              transformOrigin={{
                horizontal: "right",
                vertical: "top"
              }}
              open={!!menuAnchor}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  /**/
                }}
              >
                My account
              </MenuItem>
              <AuthConsumer>
                {({ clearStateAndCache }) => (
                  <MenuItem
                    onClick={() => {
                      clearStateAndCache();
                      userAPI.logout().then(() => history.push("/login"));
                    }}
                  >
                    Log Out
                  </MenuItem>
                )}
              </AuthConsumer>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
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

export default withStyles(styles)(withRouter(Navigation));
