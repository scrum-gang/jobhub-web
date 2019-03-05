import * as React from "react";

interface IUrlProps {
  url: string;
}

const UrlApplicationTable: React.SFC<IUrlProps> = props => {
  return (
    <a
      href={props.url}
      onClick={e => {
        // prevent specific application view from loading on url click
        e.stopPropagation();
      }}
    >
      {`${props.url.substring(0, 40)}...`}
    </a>
  );
};

export default UrlApplicationTable;
