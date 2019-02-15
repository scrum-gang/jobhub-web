import * as React from "react";

import { Button } from "@material-ui/core";

import EmailImage from "../../assets/email.svg";
import { AuthRedirect, Protection } from "../../Shared/Authorization";
import MessagePage from "../../Shared/MessagePage/MessagePage";

const CallToAction: React.FunctionComponent = () => (
  <Button type="button" size="large" variant="contained" fullWidth>
    Resend Confirmation Email
  </Button>
);

const ConfirmMessage: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.LOGGED_OUT} />
      <MessagePage
        callToAction={<CallToAction />}
        imageSource={EmailImage}
        title={"Confirm your account"}
        message={
          "Hey there. Before you start your job hunt, please check your inbox (and your spam folder) for an account verification link!"
        }
      />
    </React.Fragment>
  );
};

export default ConfirmMessage;
