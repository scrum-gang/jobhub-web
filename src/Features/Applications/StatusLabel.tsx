import { Button, Menu, MenuItem } from "@material-ui/core";
import * as React from "react";
import applicationsAPI from "../../api/applicationsAPI";
import APPLICATION_STATUSES from "../../config/constants/statusOptions";

interface IStatusProps {
  status: string;
  application: any;
  updateValue: (_: any) => void;
}

const StatusLabel: React.FunctionComponent<IStatusProps> = props => {
  const [open, setOpen] = React.useState(null);
  // TODO: Add rest call to update status for given job application when user id issue is fixed

  const handleStatusChange = async (status: string) => {
    const result = await applicationsAPI.updateStatusExternalApplication({
      id: props.application.application_id,
      new_status: status
    });
    props.updateValue(status);
  };

  const handleMenuItemClick = (status: string, e: React.MouseEvent) => {
    handleStatusChange(status);
    handleMenuClose();
    e.stopPropagation();
  };

  const handleMenuClose = () => {
    setOpen(null);
  };

  const handleStatusClick = (e: any) => {
    setOpen(e.currentTarget);
    e.stopPropagation();
  };

  return (
    <div>
      <Button
        onClick={handleStatusClick}
        fullWidth={true}
        // I realize that this is sketch, but the whole suggested way of doing it according to the documentation
        // is so convoluted and doesn't account for dynamically changing props like this one, so I just do it this way
        // also, width was set to largest value the string can take
        // again, sketch, but saves up time and avoids ugly resizing of column once a menu item is selected
        // suggestions for refactoring this welcome
        style={{
          color: APPLICATION_STATUSES[props.status],
          width: "105px"
        }}
      >
        {props.status}
      </Button>
      <Menu anchorEl={open} open={Boolean(open)} onClose={handleMenuClose}>
        {Object.keys(APPLICATION_STATUSES).map(statusOption => (
          <MenuItem
            key={statusOption}
            value={statusOption}
            onClick={e => {
              handleMenuItemClick(statusOption, e);
            }}
          >
            {statusOption}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default StatusLabel;
