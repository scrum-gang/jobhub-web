import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import {
  CircularProgress,
  createStyles,
  Fab,
  Grid,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Add as PlusIcon } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";

import { toast } from "react-toastify";
import applicationsAPI from "../../api/applicationsAPI";
import postingsAPI from "../../api/postingsAPI";
import IApplication from "../../config/types/applicationType";
import {
  AuthConsumer,
  AuthRedirect,
  Protection
} from "../../Shared/Authorization";
import AuthorizationContext from "../../Shared/Authorization/Context";
import CommentColumn from "./CommentColumn";
import CreateApplication from "./CreateApplication";
import DateColumn from "./DateColumn";
import DeadlineColumn from "./DeadlineColumn";
import ResumeColumn from "./ResumeColumn";
import StatusLabel from "./StatusLabel";
import TextLimitColumn from "./TextLimitColumn";
import UrlColumn from "./UrlColumn";

const mockData = [
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: null,
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    resume: "https://www.cs.mcgill.ca/~prakash/cv.pdf",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Associate Marketing Lead of Engineering",
    resume: "",
    status: "To apply",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment: "",
    company: "JobHub",
    date: new Date(),
    deadline: new Date("2018-03-05T19:22:56.412Z"),
    position: "Developer",
    resume: "https://www.cs.mcgill.ca/~prakash/cv.pdf",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date("2020-03-05T19:22:56.412Z"),
    deadline: new Date("2020-03-05T19:22:56.412Z"),
    position: "Developer",
    resume: "https://www.cs.mcgill.ca/~prakash/cv.pdf",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    resume: "https://www.cs.mcgill.ca/~prakash/cv.pdf",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    resume: "",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    resume: "https://www.cs.mcgill.ca/~prakash/cv.pdf",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    resume: "https://www.cs.mcgill.ca/~prakash/cv.pdf",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    resume: "",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    resume: "https://www.cs.mcgill.ca/~prakash/cv.pdf",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    resume: "https://www.cs.mcgill.ca/~prakash/cv.pdf",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    resume: "https://www.cs.mcgill.ca/~prakash/cv.pdf",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
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

const Applications: React.FunctionComponent<
  WithStyles & RouteComponentProps
> = ({ classes, history }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [
    isLoadingApplicationsData,
    setIsLoadingApplicationsData
  ] = React.useState(true);

  // TODO: Maybe use useMemo?
  const [applications, setApplications] = React.useState<IApplication[]>([]);
  const { userInfo } = React.useContext(AuthorizationContext);

  const getColumns = () => {
    return [
      {
        label: "Position",
        name: "position",
        options: {
          customBodyRender: (value: string) => (
            <TextLimitColumn value={value} limit={25} />
          ),
          filter: true,
          sort: true
        }
      },
      {
        label: "Company",
        name: "company",
        options: {
          customBodyRender: (value: string) => (
            <TextLimitColumn value={value} limit={15} />
          ),
          filter: true,
          sort: false
        }
      },
      {
        label: "Status",
        name: "status",
        options: {
          customBodyRender: (
            value: string,
            tableMeta: any,
            updateValue: (_: any) => void
          ) => (
            <StatusLabel
              status={value}
              application={applications[tableMeta.rowIndex]}
              updateValue={updateValue}
            />
          ),
          filter: true,
          sort: false
        }
      },
      {
        label: "Added On",
        name: "date",
        options: {
          customBodyRender: (value: any) => <DateColumn date={value} />,
          filter: true,
          sort: false
        }
      },
      {
        label: "Deadline",
        name: "deadline",
        options: {
          customBodyRender: (value: any, tableMeta: any) => (
            <DeadlineColumn date={value} rowData={tableMeta.rowData} />
          ),
          filter: true,
          sort: false
        }
      },
      {
        label: "Comment",
        name: "comment",
        options: {
          customBodyRender: (value: string) => (
            <CommentColumn comment={value} />
          ),
          filter: true,
          sort: false
        }
      },
      {
        label: "CV",
        name: "resume",
        options: {
          customBodyRender: (value: string) => <ResumeColumn url={value} />,
          filter: true,
          sort: false
        }
      },
      {
        label: "URL",
        name: "url",
        options: {
          customBodyRender: (value: string) => <UrlColumn url={value} />,
          filter: true,
          sort: false
        }
      }
    ];
  };

  useEffect(() => {
    fetchApplicationData();
  }, []);

  const fetchApplicationData = async () => {
    setIsLoadingApplicationsData(true);

    if (userInfo) {
      try {
        const result = await getProcessedApplications(
          (await applicationsAPI.getApplicationsUser()).data
        );

        setApplications(result);
      } catch (e) {
        toast.error(`Failed to fetch applications`);
      }
    }

    setIsLoadingApplicationsData(false);
  };

  const getProcessedApplications = async (data: any[]) => {
    const getInhouseApplicationMissingFields = (
      jobId: string,
      company: string = "Failed to load",
      datePosted: Date = new Date(),
      deadline: Date = new Date(),
      position: string = "Failed to load"
    ) => ({
      company,
      date_posted: datePosted,
      deadline,
      position,
      url: `http://${window.location.href.split("/")[2]}/postings/${jobId}`
    });

    return Promise.all(
      data.map(async el => {
        if (!el.is_inhouse_posting) {
          return el;
        }

        try {
          const postingData = (await postingsAPI.getPostingById(el.job_id))
            .data;

          return {
            ...el,
            ...getInhouseApplicationMissingFields(
              el.job_id,
              postingData.company,
              postingData.posting_date,
              postingData.deadline,
              postingData.title
            )
          };
        } catch (e) {
          return {
            ...el,
            ...getInhouseApplicationMissingFields(el.job_id)
          };
        }
      })
    );
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    fetchApplicationData();
  };

  const renderApplicationData = () => {
    if (isLoadingApplicationsData) {
      return <CircularProgress />;
    } else {
      return (
        <MUIDataTable
          title={"My Applications"}
          data={applications}
          columns={getColumns() as any}
          options={{
            onRowClick: (_: any, rowMeta: any) =>
              history.push(
                `/applications/${
                  applications[rowMeta.dataIndex].application_id
                }`
              ),
            responsive: "scroll",
            selectableRows: false
          }}
        />
      );
    }
  };

  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.IS_APPLICANT} />
      <Grid container direction="column" className={classes.container}>
        {renderApplicationData()}
      </Grid>
      <Fab color="secondary" className={classes.fab} onClick={handleOpen}>
        <PlusIcon />
      </Fab>
      <CreateApplication handleClose={handleClose} modalOpen={openModal} />
    </React.Fragment>
  );
};

export default withStyles(styles)(withRouter(Applications));
