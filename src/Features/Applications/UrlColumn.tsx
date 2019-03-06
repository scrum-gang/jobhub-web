import * as React from "react";

interface IUrlProps {
  url: string;
}

const UrlColumn: React.SFC<IUrlProps> = props => {
  const handleUrlClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <div>
      {!!props.url && (
        <a href={props.url} onClick={handleUrlClick}>
          {`${props.url.substring(0, 40)}`}
          {props.url.length > 40 && "..."}
        </a>
      )}
    </div>
  );
};

export default UrlColumn;
