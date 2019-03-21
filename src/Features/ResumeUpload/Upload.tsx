// tslint:disable-next-line
import "filepond/dist/filepond.min.css";

import {
  Button,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
  WithStyles,
  createStyles,
  withStyles
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import { FilePond } from "react-filepond";
import IconButton from "@material-ui/core/IconButton";
import ResumeList from "./ResumeList";
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
    }
  });


interface IFile {
  filename: string;
}

interface IProps extends WithStyles<typeof styles> {}

const Upload: React.FunctionComponent<IProps> = ({ classes, children }) => {
  const [resumes, setResumes] = useState<IFile[]>([]);

  const deleteResumeHandler = (index: any) => {
    const newResumes = [...resumes];
    newResumes.splice(index, 1);
    setResumes(newResumes);
  };

  return (
    <Wrapper title="Resume Upload">
      <Grid container justify="center" spacing={16}>
        {/* <ResumeList/> */}

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Resume Name</TableCell>
              <TableCell>Revision Number</TableCell>
              <TableCell>Uploaded At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {resumes.map((resume, index) => (
              <TableRow key={resume.filename}>
              
                <TableCell key={index}>
                  <div style={{ float: "left"}}>
                    {resumes[index].filename}
                  </div>
                 
                </TableCell>

                <TableCell>
                  <div style={{alignContent: "center"}}>
                    69
                  </div>
                  </TableCell>

                <TableCell>

                  <div style={{ float: "left", paddingTop: "20px" }}>
                    {new Date().toLocaleString()}
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

        <Grid
          container
          justify="flex-start"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5% "
          }}
        >
          <div style={{ width: "300px", top: "25%" }}>
            <FilePond
              allowMultiple={true}
              onupdatefiles={items => {
                setResumes(items);
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default withStyles(styles)(Upload);
