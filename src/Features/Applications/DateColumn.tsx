import * as React from "react";

interface IDateColumnProps {
  date: Date;
}

const DateColumn: React.FunctionComponent<IDateColumnProps> = props => {
  const date = new Date(props.date);

  return <div>{!!date && date.toLocaleDateString()}</div>;
};

export default DateColumn;
