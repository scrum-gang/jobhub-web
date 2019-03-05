import * as React from "react";

interface IDateColumnProps {
  date: Date;
}

const DateColumn: React.SFC<IDateColumnProps> = props => {
  return <div>{!!props.date && props.date.toLocaleDateString()}</div>;
};

export default DateColumn;
