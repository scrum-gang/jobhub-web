import * as React from "react";

import {
  createStyles,
  Fab,
  Grid,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Add as PlusIcon } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";

import { AuthRedirect, Protection } from "../../Shared/Authorization";

const mockData = [
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  },
  {
    company: "JobHub",
    deadline: new Date(),
    position: "Developer",
    posted: new Date(),
    status: "Applied",
    url: "http"
  }
];

const columns = [
  {
    label: "Position",
    name: "position",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    label: "Company",
    name: "company",
    options: {
      filter: true,
      sort: false
    }
  },
  {
    label: "Status",
    name: "status",
    options: {
      filter: true,
      sort: false
    }
  }
];

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: 20,
      padding: theme.spacing.unit * 8
    },
    fab: {
      bottom: theme.spacing.unit * 2,
      position: "fixed",
      right: theme.spacing.unit * 2
    }
  });

const Applications: React.FunctionComponent<WithStyles> = ({ classes }) => {
  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.LOGGED_IN} />
      <Grid container direction="column" className={classes.container}>
        <MUIDataTable
          title={"My Applications"}
          data={mockData}
          columns={columns}
          options={{
            onRowClick: () => console.log("row"),
            responsive: "scroll",
            selectableRows: false
          }}
        />
      </Grid>
      <Fab color="secondary" className={classes.fab}>
        <PlusIcon />
      </Fab>
    </React.Fragment>
  );
};

export default withStyles(styles)(Applications);
