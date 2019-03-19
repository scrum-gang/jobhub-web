import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import StatusType from "../../config/types/statusTypes";

interface IDeadlineProps extends WithStyles {
  date: Date;
  rowData: string[];
}

const styles = (theme: Theme) =>
  createStyles({
    blackText: {
      color: "#000000"
    },
    redText: {
      color: "#ff0000"
    }
  });

const Deadline: React.FunctionComponent<IDeadlineProps> = props => {
  const isWithinTwoDayRangeFromToday = () => {
    const currentDate = new Date();
    const inTwoDaysDate = new Date().setDate(currentDate.getDate() + 2);

    return (
      (props.date >= currentDate && props.date.getTime() <= inTwoDaysDate) ||
      props.date < currentDate
    );
  };

  const isPendingApplication = () => {
    // do this because I don't want to hardcode the index from which to fetch
    // the status
    return props.rowData.includes(StatusType.TO_APPLY);
  };

  return (
    <div>
      {!!props.date && (
        <span
          className={
            isWithinTwoDayRangeFromToday() && isPendingApplication()
              ? props.classes.redText
              : props.classes.blackText
          }
        >
          {props.date.toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default withStyles(styles)(Deadline);
