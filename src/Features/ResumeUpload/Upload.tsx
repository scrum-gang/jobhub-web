import React, { useEffect, useState } from "react";

// tslint:disable-next-line
import "filepond/dist/filepond.min.css";

import { Field, Form, Formik } from "formik";
import { FilePond } from "react-filepond";

import {
  Button,
  createStyles,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

import * as Yup from "yup";

import Wrapper from "./Wrapper";
// import UploadModal from "./UploadModal"

import { SimpleFileUpload } from "formik-material-ui";

// 10 Megs
const MAX_FILE_SIZE = 10485760;

const schema = Yup.object().shape({
  file: Yup.mixed()
    .required("Required")
    .test(
      "file",
      "File must be less than 10MB",
      value => value == null || value.size < MAX_FILE_SIZE
    )
});

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

interface IValues {
  file: "" | File;
}

interface IProps extends WithStyles<typeof styles> {}

const Upload: React.FunctionComponent<IProps> = ({ classes, children }) => {
  const [resumes, setResumes] = useState([
    {
      filename: ""
    }
  ]);

  return (
    <Wrapper title="Resume Upload">
      <Grid container justify="center" spacing={16}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Uploaded Resumes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            
              {resumes.map((resume, index) => (
                <TableRow>
                <TableCell key={index}>{resumes[index].filename}</TableCell>
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
                const newResumes = [...resumes]
                newResumes.push({filename: items[0].filename})
                setResumes(newResumes)
                // console.log(items[0].filename);
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default withStyles(styles)(Upload);
