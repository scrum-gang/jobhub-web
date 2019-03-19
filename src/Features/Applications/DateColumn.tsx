import * as React from "react";

interface IDateColumnProps {
  date: Date;
}

const DateColumn: React.FunctionComponent<IDateColumnProps> = props => {
  return <div>{!!props.date && props.date.toLocaleDateString()}</div>;
};

export default DateColumn;
