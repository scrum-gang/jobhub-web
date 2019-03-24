import {
  createStyles,
  Grid,
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
  withStyles
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FilePond } from "react-filepond";

// tslint:disable-next-line
import "filepond/dist/filepond.min.css";

import resumesAPI from "../../api/resumesAPI";
import DeleteIcon from "@material-ui/icons/Delete";

import AuthorizationContext from "../../Shared/Authorization/Context";
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
  id: string;
  filenameWithoutExtension: string;
}

interface IProps extends WithStyles<typeof styles> {}

const Upload: React.FunctionComponent<IProps> = ({ classes, children }) => {
  const { userInfo } = React.useContext(AuthorizationContext);
  // const [resumes, setResumes] = useState<IFile[]>([]);
  const [userResumes, setUserResumes] = useState([]);
  const [filter, setFilter] = useState("");

  React.useEffect(() => {
    if (userInfo) {
      fetchResumes();
    }
  }, []);

  const fetchResumes = async () => {
    if (userInfo) {
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      setUserResumes(result);
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
  };

  const handleBase64Encoding = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error: any) => reject(error);
    });
  };

  const postResumeHandler = async (file: any) => {
    if (userInfo && file) {
      const postedResume: any = {
        download_resume_url: "https://google.com",
        resume_data: handleBase64Encoding(file.file).then(data => data.toString().split(",")[1]),
        revision: "1",
        title: file.filenameWithoutExtension.replace(/\s/g, ""),
        user_id: userInfo._id,
        user_name: ""
      };
      await resumesAPI.createResumeUser(postedResume);
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      setUserResumes(result);
    }
  };

  const patchResumeRevisionHandler = async (file: any) => {
    if (userInfo && file) {
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      if (
        result.find(
          (r: any) =>
            r.title === file.filenameWithoutExtension.replace(/\s/g, "")
        )
      ) {
        const found = result.findIndex(
          (r: any) =>
            r.title === file.filenameWithoutExtension.replace(/\s/g, "")
        );
        const resumeToPatchId = result[found].id;
        const newRevision = (result[found].revision = (
          parseInt(result[found].revision, 10) + 1
        ).toString());
        const payload = {
          revision: newRevision,
          title: result[found].title
        };
        await resumesAPI.patchResumeRevision(resumeToPatchId, payload);
        const res = (await resumesAPI.getResumesUser(userInfo._id)).data;
        setUserResumes(res);
      }
    }
  };

  const handleResumeUpdate = async (file: any) => {
    if (userInfo) {
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      if (
        result.some(
          (e: any) =>
            e.title === file.filenameWithoutExtension.replace(/\s/g, "")
        )
      ) {
        patchResumeRevisionHandler(file);
      } else {
        postResumeHandler(file);
      }
    }
  };

  const filteredResumes: any[] = userResumes.filter((resume: any) =>
    resume.title.includes(filter)
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
              <TableCell align="center">Revision Number</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredResumes.map((resume: any, index: any) => (
              <TableRow key={resume.title}>
                <TableCell key={index}>
                  <Typography>{filteredResumes[index].title}</Typography>
                </TableCell>

                <TableCell align="center">
                  {filteredResumes[index].revision}
                </TableCell>

                <TableCell>
                  {/* <div style={{ float: "left", paddingTop: "20px" }}>
                    <Typography>{new Date().toLocaleString()}</Typography>
                  </div> */}

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
              handleResumeUpdate(items[0]);
            }}
            server="https://httpbin.org/post"
            allowRevert={false}
          />
        </div>
      </Grid>
    </Wrapper>
  );
};

export default withStyles(styles)(Upload);
