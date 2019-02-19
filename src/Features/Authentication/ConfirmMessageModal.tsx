import * as React from "react";
import { toast } from "react-toastify";

import { Button, Dialog } from "@material-ui/core";

import userAPI from "../../api/userAPI";
import EmailImage from "../../assets/email.svg";
import MessagePage from "../../Shared/MessagePage/MessagePage";

interface IProps {
  email: string;
  onCloseCallback?: () => void;
}

const ConfirmMessage: React.FunctionComponent<IProps> = ({
  email,
  onCloseCallback
}) => {
  const sendVerification = () => {
    return userAPI.resendVerification({ email })
      .then(() => {
        toast.info(`Email confirmation resent to ${email}!`);
      })
  };

  const CallToAction: React.FunctionComponent = () => (
    <Button
      type="button"
      size="large"
      variant="contained"
      fullWidth
      onClick={sendVerification}
    >
      Resend Confirmation Email
    </Button>
  );

  const [open, setOpen] = React.useState(true);

  const handleClose = (callback?: () => void) => {
    return () => {
      if (callback) {
        callback();
      }
      setOpen(false);
    };
  };

  return (
    <Dialog open={open} onClose={handleClose(onCloseCallback)}>
      <MessagePage
        callToAction={<CallToAction />}
        imageSource={EmailImage}
        title={"Confirm your account"}
        message={
          "Hey there. Before you start your job hunt, please check your inbox (and your spam folder) for an account verification link!"
        }
      />
    </Dialog>
  );
};

export default ConfirmMessage;
