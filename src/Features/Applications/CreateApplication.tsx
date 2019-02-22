import * as React from "react";

import { Dialog } from "@material-ui/core";

import ApplicationForm, { Modes } from "./ApplicationForm";

interface IProps {
  modalOpen: boolean;
  handleClose: () => void;
}

const CreateApplication: React.FunctionComponent<IProps> = ({
  modalOpen,
  handleClose
}) => {
  return (
    <Dialog open={modalOpen} onClose={handleClose}>
      <ApplicationForm mode={Modes.CREATE} handleClose={handleClose} />
    </Dialog>
  );
};

export default CreateApplication;
