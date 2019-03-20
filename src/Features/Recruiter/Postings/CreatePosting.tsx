import * as React from "react";

import { Dialog } from "@material-ui/core";

import PostingForm, { Modes } from "./PostingForm";

interface IProps {
  modalOpen: boolean;
  handleClose: () => void;
}

const CreatePosting: React.FunctionComponent<IProps> = ({
  modalOpen,
  handleClose
}) => {
  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <PostingForm mode={Modes.CREATE} handleClose={handleClose} />
    </Dialog>
  );
};

export default CreatePosting;
