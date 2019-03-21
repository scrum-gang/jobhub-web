// tslint:disable-next-line
import "filepond/dist/filepond.min.css";

import {
  Button,
  Grid,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
  WithStyles,
  createStyles,
  withStyles
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import { FilePond } from "react-filepond";
import Wrapper from "./Wrapper";

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      backgroundColor: "blue",
      margin: theme.spacing.unit,
      minWidth: 120
    },

    pad: {
      marginBottom: 15,
      marginTop: 15
    },
    root: {
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto",
      width: "100%"
    },
    table: {
      minWidth: 700
    },
    textField: {
      alignSelf: "flex-start",
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    }
  });

interface IFile {
  filename: string;
}

interface IProps extends WithStyles<typeof styles> {}

const Upload: React.FunctionComponent<IProps> = ({ classes, children }) => {
  const [resumes, setResumes] = useState<IFile[]>([]);
  const [filter, setFilter] = useState("");

  const deleteResumeHandler = (index: any) => {
    const newResumes = [...resumes];
    newResumes.splice(index, 1);
    setResumes(newResumes);
  };

  const filteredResumes = resumes.filter(resume =>
    resume.filename.includes(filter)
  );

  return (
    <Wrapper title="Resume Upload">
      <Grid container direction="column" spacing={24}>
        <TextField
          id="standard-textarea"
          label="Search resumes"
          placeholder=""
          multiline
          className={classes.textField}
          margin="normal"
          onChange={event => {
            const searchResults = event.target.value;
            setFilter(searchResults);
          }}
        />

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Resume Name</TableCell>
              <TableCell>Revision Number</TableCell>
              <TableCell>Uploaded At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredResumes.map((resume, index) => (
              <TableRow key={resume.filename}>
                <TableCell key={index}>
                  <Typography>{filteredResumes[index].filename}</Typography>
                </TableCell>

                <TableCell>
                  <div style={{ alignContent: "center" }}>69</div>
                </TableCell>

                <TableCell>
                  <div style={{ float: "left", paddingTop: "20px" }}>
                    <Typography>{new Date().toLocaleString()}</Typography>
                  </div>

                  <IconButton
                    key={index}
                    aria-label="Delete"
                    style={{ margin: "theme.spacing.unit", float: "right" }}
                    onClick={deleteResumeHandler}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ paddingTop: "40px" }}>
          <FilePond
            allowMultiple={true}
            onupdatefiles={items => {
              setResumes(items);
            }}
          />
        </div>
      </Grid>
    </Wrapper>
  );
};

export default withStyles(styles)(Upload);
