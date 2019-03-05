import * as React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

import APPLICATION_STATUSES from "../../config/constants/statusOptions";

interface StatusProps {
  status: string;
  index: number;
  updateValue: Function;
}

const StatusLabel: React.FunctionComponent<StatusProps> = props => {
  const [open, setOpen] = React.useState(null);
  // TODO: Add rest call to update status for given job application when user id issue is fixed

  const handleStatusChange = (status: string) => {
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
        // I realize that this is sketch, but the whole suggested way of doing it according to the documentation
        // is so convoluted and doesn't account for dynamically changing props like this one, so I just do it this way
        // also, width was set to largest value the string can take
        // again, sketch, but saves up time and avoids ugly resizing of column once a menu item is selected
        // suggestions for refactoring this welcome
        style={{ width: "105px", color: APPLICATION_STATUSES[props.status] }}
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
