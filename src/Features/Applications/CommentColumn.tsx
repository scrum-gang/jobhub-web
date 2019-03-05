import {
  Button,
  createStyles,
  Popover,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Check as CheckIcon } from "@material-ui/icons";

import * as React from "react";

interface ICommentColumnProps extends WithStyles {
  comment: string;
}

const styles = (theme: Theme) =>
  createStyles({
    break: {
      marginTop: "10px"
    },
    paper: {
      maxWidth: "200px",
      padding: theme.spacing.unit
    },
    popover: {
      pointerEvents: "none"
    }
  });

const CommentColumn: React.FunctionComponent<ICommentColumnProps> = props => {
  const [open, setOpen] = React.useState(null);
  const { classes } = props;

  const handlePopoverOpen = (e: any) => {
    setOpen(e.currentTarget);
    e.stopPropagation();
  };

  const handlePopoverClose = (e: any) => {
    setOpen(null);
  };

  return (
    <div>
      {!!props.comment && (
        <React.Fragment>
          <Button
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <CheckIcon color="action" />
          </Button>

          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper
            }}
            open={Boolean(open)}
            anchorEl={open}
            anchorOrigin={{
              horizontal: "center",
              vertical: "bottom"
            }}
            transformOrigin={{
              horizontal: "center",
              vertical: "top"
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            {props.comment.split("\n").map((item, key) => {
              return (
                <Typography
                  key={key}
                  {...key > 0 && { className: classes.break }}
                >
                  {item}
                </Typography>
              );
            })}
          </Popover>
        </React.Fragment>
      )}
    </div>
  );
};

export default withStyles(styles)(CommentColumn);
