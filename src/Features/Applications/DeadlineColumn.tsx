import * as React from "react";

interface IDeadlineProps {
  date: Date;
}

const Deadline: React.SFC<IDeadlineProps> = props => {
  const checkWithinTwoDayRangeFromToday = () => {
    const currentDate = new Date();
    const inTwoDaysDate = new Date().setDate(currentDate.getDate() + 2);

    return (
      (props.date >= currentDate && props.date.getTime() <= inTwoDaysDate) ||
      props.date < currentDate
    );
  };

  return (
    <div>
      {!!props.date && (
        <span
          style={{
            color: checkWithinTwoDayRangeFromToday() ? "#ff0000 " : "#000000"
          }}
        >
          {props.date.toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default Deadline;
