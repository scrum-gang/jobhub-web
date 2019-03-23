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
import { FilePond, setOptions } from "react-filepond";
import React, { useEffect, useState } from "react";

import AuthorizationContext from "../../Shared/Authorization/Context";
import DeleteIcon from "@material-ui/icons/Delete";
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

interface IFilePondProps {
  server: {
    process: {
      headers: {};
      method: string;
    };
    url: string;
    ServerUrl: string;
    load: string;
  };
}

interface IProps extends WithStyles<typeof styles> {}

const Upload: React.FunctionComponent<IProps> = ({ classes, children }) => {
  const { userInfo } = React.useContext(AuthorizationContext);
  const [resumes, setResumes] = useState<IFile[]>([]);
  const [userResumes, setUserResumes] = useState([]);
  const [filter, setFilter] = useState("");

  console.log("user resumes state: ", userResumes);
  console.log("local storage", localStorage);

  React.useEffect(() => {
    if (userInfo) {
      fetchResumes();
    }
  }, []);

  const fetchResumes = async () => {
    if (userInfo) {
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      setUserResumes(result);
      console.log("fetch: ",result)

    }
  };

  const deleteResumeHandler = async (index: any) => {
    const newResumes = [...userResumes];
    const toDelete: any = newResumes[index];
    newResumes.splice(index, 1);

    if (userInfo) {
      await resumesAPI.deleteResumeUser(
        userInfo._id,
        toDelete.title,
        toDelete.revision
      );
    }
    setUserResumes(newResumes);
    console.log("new resumes from delete: ", newResumes)

  };

  const newPostedResumes = [...userResumes];

  const postResumeHandler = async (file: any) => {
    if (userInfo) {
      const postedResume:any = {
        resumeData: "aGVsbG8=",
        revision: "76",
        title: file.filename,
        userId: userInfo._id,
        userName: ""
      }; 

      const stateResume = {
        download_resume_url: "",
        id: 140,
        revision: postedResume.revision,
        title: postedResume.title,
        user_id: postedResume.userId,
        user_name: postedResume.userName
      }
            
      const create = await resumesAPI.createResumeUser(
        postedResume.userId,
        postedResume.userName,
        postedResume.revision,
        postedResume.title,
        postedResume.resumeData
      );

      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      setUserResumes(result);

      console.log("posted resume: ", postedResume);
      console.log("state resume: ", stateResume)
      
    }


  };

  console.log("user resumes:dddd ", newPostedResumes)


  const encode = (file: File, callback: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsText(file);
  };

  const getBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader) {
        // console.log(reader.result.toString())
      }
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  };

  const filteredResumes: any[] = userResumes.filter((resume: any) =>
    resume.title.includes(filter)
  );

  const serverUrl: string = "https://resume-revision.herokuapp.com/resumes";

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
            {filteredResumes.map((resume: any, index: any) => (
              <TableRow key={resume.title}>
                <TableCell key={index}>
                  <Typography>{filteredResumes[index].title}</Typography>
                </TableCell>

                <TableCell>{filteredResumes[index].revision}</TableCell>

                <TableCell>
                  <div style={{ float: "left", paddingTop: "20px" }}>
                    <Typography>{new Date().toLocaleString()}</Typography>
                  </div>

                  <IconButton
                    key={index}
                    aria-label="Delete"
                    style={{ margin: "theme.spacing.unit", float: "right" }}
                    onClick={() => deleteResumeHandler(index)}
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
            onupdatefiles={(items: any) => {
              console.log(items[0]);
              postResumeHandler(items[0]);
            }}
          />
        </div>
      </Grid>
    </Wrapper>
  );
};

export default withStyles(styles)(Upload);
