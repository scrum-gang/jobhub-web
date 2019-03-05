import * as React from "react";
import StatusType from "../../config/types/statusTypes";

interface IDeadlineProps {
  date: Date;
  rowData: string[];
}

const Deadline: React.SFC<IDeadlineProps> = props => {
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
          style={{
            color:
              isWithinTwoDayRangeFromToday() && isPendingApplication()
                ? "#ff0000 "
                : "#000000"
          }}
        >
          {props.date.toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default Deadline;
