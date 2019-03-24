import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Grid, WithStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import applicationsAPI from "../../../api/applicationsAPI";
import { AuthRedirect, Protection } from "../../../Shared/Authorization";

interface IMatchParams {
  postingid: string;
}

const ViewPostingApplications: React.FunctionComponent<
  WithStyles & RouteComponentProps<IMatchParams>
> = ({ match }) => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data } = await applicationsAPI.getApplicationsPerPosting(
      match.params.postingid
    );
    if (Array.isArray(data)) {
      setApplications(data);
    }
  };

  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.IS_RECRUITER} />
      <Grid container>
        <MUIDataTable
          title="Applicants"
          data={applications}
          options={{
            selectableRows: false
          }}
          columns={[
            {
              label: "Applicant",
              name: "user_id"
            },
            {
              label: "Status",
              name: "status"
            },
            {
              label: "Resume",
              name: "resume"
            }
          ]}
        />
      </Grid>
    </React.Fragment>
  );
};

export default withRouter(ViewPostingApplications);
