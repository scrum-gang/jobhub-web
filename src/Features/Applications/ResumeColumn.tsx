import { InsertDriveFile as FileIcon } from "@material-ui/icons";

import * as React from "react";

interface IResumeColumnProps {
  url: string;
}

const ResumeColumn: React.FunctionComponent<IResumeColumnProps> = props => {
  // TODO: on hover, show resume name + revision

  const handleIconClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div>
      {!!props.url && (
        <a href={props.url}>
          <FileIcon onClick={handleIconClick} color="action" />
        </a>
      )}
    </div>
  );
};

export default ResumeColumn;
