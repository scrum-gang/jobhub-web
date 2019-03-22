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

import AuthorizationContext from "../../Shared/Authorization/Context";
import DeleteIcon from "@material-ui/icons/Delete";
import { FilePond } from "react-filepond";
import Wrapper from "./Wrapper";
import axios from "axios";
import resumesAPI from "../../api/resumesAPI";

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
  id: string;
  filenameWithoutExtension: string;
}

interface IProps extends WithStyles<typeof styles> {}

const Upload: React.FunctionComponent<IProps> = ({ classes, children }) => {
  const { userInfo } = React.useContext(AuthorizationContext);
  const [resumes, setResumes] = useState<IFile[]>([]);
  const [userResumes, setUserResumes] = React.useState([]);
  const [filter, setFilter] = useState("");

  React.useEffect(() => {
    if (userInfo) {
      fetchResumes();
      console.log(userInfo);
    }
    console.log(userResumes);
  }, [userInfo]);

  const fetchResumes = async () => {
    if (userInfo) {
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      setUserResumes(result);
      console.log(userResumes);
    } else {
      console.log("gg");
    }
  };

  const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTUzY2FlYjgyMDhhMDAxN2JiYWY1NCIsImVtYWlsIjoic3VsZW1hbm1hbGlrMTgwQGdtYWlsLmNvbSIsInR5cGUiOiJBcHBsaWNhbnQiLCJpYXQiOjE1NTMyODQzMTIsImV4cCI6MTU1MzI4NTIxMn0.jvk1rJIn3hPShRHHSc_e5TlCbxxtvFGqYwcB4fo0wN4";

  // get resumes currently stored in resume-revisions db
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://resume-revision.herokuapp.com/resumes/5c9466f39758a1001703484e",
  //       {
  //         headers: {
  //           Authorization: "Bearer " + jwt
  //         }
  //       }
  //     )
  //     .then(
  //       response => {
  //         const res = response.data;

  //         const mapRes = res.map((r: any, i: any) => {
  //           return {
  //             filename: r.title,
  //             filenameWithoutExtension: r.revision,
  //             id: r.id
  //           };
  //         });

  //         setResumes(mapRes);
  //       },
  //       error => {
  //         const status = error.response.status;
  //       }
  //     );
  // }, []);

  // delete

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
                  {/* {resumes.map((r:any, i:any)=>
                    <div key={r.filename + i}>
                      {r.filenameWithoutExtension}
                    </div>
                    )} */}
                  <div style={{ alignContent: "center" }}>
                    {resumes.map(
                      (r: any, i: any) => r.filenameWithoutExtension
                    )}
                  </div>
                </TableCell>

                {/* {resumes.map((r:any) =>
                  <TableCell>
                    <div>
                      {r.filenameWithoutExtension}
                    </div>
                  </TableCell>
                )} */}

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
