import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

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

import postingsAPI from "../../../api/postingsAPI";
import { AuthRedirect, Protection } from "../../../Shared/Authorization";
import AuthorizationContext from "../../../Shared/Authorization/Context";
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
  const [openModal, setOpenModal] = useState(false);
  const [postings, setPostings] = useState([]);
  const { userInfo } = useContext(AuthorizationContext);

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo) {
        const { data } = await postingsAPI.getPostingByRecruiter(userInfo._id);
        setPostings(data);
      }
    };
    fetchData();
  }, []);

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
            {
              label: "Title",
              name: "title",
            },
            {
              label: "Company",
              name: "company",
            },
            {
              label: "Location",
              name: "location",
            },
            {
              label: "Start Date",
              name: "start_date",
            },
            {
              label: "End Date",
              name: "end_date",
            },
            {
              label: "Deadline",
              name: "deadline",
            }
          ]}
          data={postings}
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
