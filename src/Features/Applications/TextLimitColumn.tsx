import * as React from "react";

interface ITextLimitProps {
  value: string;
  limit: number;
}

const TextLimitColumn: React.SFC<ITextLimitProps> = props => {
  return (
    <div>
      {!!props.value && (
        <span>
          {`${props.value.substring(0, props.limit)}`}
          {props.value.length > props.limit && "..."}
        </span>
      )}
    </div>
  );
};

export default TextLimitColumn;
