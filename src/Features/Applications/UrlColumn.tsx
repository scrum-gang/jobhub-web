import * as React from "react";

interface IUrlProps {
  url: string;
}

const UrlColumn: React.SFC<IUrlProps> = props => {
  return (
    <div>
      {!!props.url && (
        <a
          href={props.url}
          onClick={e => {
            // prevent specific application view from loading on url click
            e.stopPropagation();
          }}
        >
          {`${props.url.substring(0, 40)}`}
          {props.url.length > 40 && "..."}
        </a>
      )}
    </div>
  );
};

export default UrlColumn;
