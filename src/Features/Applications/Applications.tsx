import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

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
import CreateApplication from "./CreateApplication";
import DateColumn from "./DateColumn";
import DeadlineColumn from "./DeadlineColumn";
import StatusLabel from "./StatusLabel";
import TextLimitColumn from "./TextLimitColumn";
import UrlColumn from "./UrlColumn";

const mockData = [
  {
    company: null,
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Associate Marketing Lead of Engineering",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date("2018-03-05T19:22:56.412Z"),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date("2020-03-05T19:22:56.412Z"),
    deadline: new Date("2020-03-05T19:22:56.412Z"),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  },
  {
    company: "JobHub",
    date: new Date(),
    deadline: new Date(),
    position: "Developer",
    status: "Applied",
    url:
      "https://careers.google.com/jobs/results/5784153781993472-technical-curriculum-developer-infrastructure-google-cloud/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&company=Google&company=YouTube"
  }
];

const columns = [
  {
    label: "Position",
    name: "position",
    options: {
      customBodyRender: (value: string, _: any) => (
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
      customBodyRender: (value: string, _: any) => (
        <TextLimitColumn value={value} limit={15} />
      ),
      filter: true,
      sort: false
    }
  },
  {
    label: "Added On",
    name: "date",
    options: {
      customBodyRender: (value: Date, _: any) => <DateColumn date={value} />,
      filter: true,
      sort: false
    }
  },
  {
    label: "Deadline",
    name: "deadline",
    options: {
      customBodyRender: (value: Date, _: any) => (
        <DeadlineColumn date={value} />
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
          index={tableMeta.rowIndex}
          updateValue={updateValue}
        />
      ),
      filter: true,
      sort: false
    }
  },
  {
    label: "URL",
    name: "url",
    options: {
      customBodyRender: (value: string, _: any) => <UrlColumn url={value} />,
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

const Applications: React.FunctionComponent<
  WithStyles & RouteComponentProps
> = ({ classes, history }) => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.LOGGED_IN} />
      <Grid container direction="column" className={classes.container}>
        <MUIDataTable
          title={"My Applications"}
          data={mockData}
          columns={columns as any}
          options={{
            onRowClick: (_, rowMeta) =>
              history.push(`/applications/${rowMeta.dataIndex}`),
            responsive: "scroll",
            selectableRows: false
          }}
        />
      </Grid>
      <Fab color="secondary" className={classes.fab} onClick={handleOpen}>
        <PlusIcon />
      </Fab>
      <CreateApplication handleClose={handleClose} modalOpen={openModal} />
    </React.Fragment>
  );
};

export default withStyles(styles)(withRouter(Applications));
