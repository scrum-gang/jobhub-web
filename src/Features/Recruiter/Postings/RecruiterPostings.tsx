import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import {
  createStyles,
  Fab,
  Grid,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { Add as PlusIcon } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";

import { AuthRedirect, Protection } from "../../../Shared/Authorization";
import CreatePosting from "./CreatePosting";

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

const RecruiterPostings: React.FunctionComponent<
  WithStyles & RouteComponentProps
> = ({ classes }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.IS_RECRUITER} />
      <Grid container direction="column" className={classes.container}>
        <MUIDataTable
          title={"My Job Postings"}
          columns={[
            "Title",
            "Location",
            "Start Date",
            "End Date",
            "Posting Date"
          ]}
          data={[]}
        />
      </Grid>
      <Fab color="secondary" className={classes.fab} onClick={handleOpen}>
        <PlusIcon />
      </Fab>
      <CreatePosting handleClose={handleClose} modalOpen={openModal} />
    </React.Fragment>
  );
};

export default withStyles(styles)(RecruiterPostings);
