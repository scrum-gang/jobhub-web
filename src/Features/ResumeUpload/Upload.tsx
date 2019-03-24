import {
  Button,
  createStyles,
  Grid,
  IconButton,
  InputBase,
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
import { toast } from "react-toastify";

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
  const [userResumes, setUserResumes] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    if (userInfo) {
      try {
        const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
        setUserResumes(result);
      } catch (e) {
        toast.error(`Failed to fetch resumes!`);
      }
    }
  };

  const deleteResumeHandler = async (index: any) => {
    const newResumes = [...userResumes];
    const toDelete: any = newResumes[index];
    newResumes.splice(index, 1);

    if (userInfo) {
      try {
        await resumesAPI.deleteResumeUser(
          userInfo._id,
          toDelete.title,
          toDelete.revision
        );
      } catch (e) {
        toast.error(`Failed to delete resume ${toDelete.title}!`);
      }
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

  const post = async (file: any) => {
    const b64d = await handleBase64Encoding(file.file).then(async data => {
      const bla = data.toString().split(",")[1];
      if (userInfo && file) {
        const postedResume: any = {
          resume_data: bla,
          revision: "1",
          title: file.filenameWithoutExtension.replace(/\s/g, ""),
          user_id: userInfo._id,
          user_name: ""
        };
        try {
          await resumesAPI.createResumeUser(postedResume);
        } catch (e) {
          toast.error("Failed to upload resume");
        }

        await resumesAPI.createResumeUser(postedResume);
        const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
        setUserResumes(result);
      }
    });
  };

  const postResumeHandler = async (file: any) => {
    const b64d = await handleBase64Encoding(file).then(
      data => data.toString().split(",")[1]
    );

    if (userInfo && file) {
      // const postedResume: any = {
      //   resume_data: b64d,
      //   revision: "1",
      //   title: file.filenameWithoutExtension.replace(/\s/g, ""),
      //   user_id: userInfo._id,
      //   user_name: ""
      // };
      const postedResume: any = {
        resume_data: b64d,
        revision: "1",
        title: file.name.split(".")[0],
        user_id: userInfo._id,
        user_name: ""
      };
      console.log(postedResume);

      await resumesAPI.createResumeUser(postedResume);
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      setUserResumes(result);
    }
  };

  const patchResumeRevisionHandler = async (file: any) => {
    if (userInfo && file) {
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      if (result.find((r: any) => r.title === file.name.split(".")[0])) {
        const found = result.findIndex(
          (r: any) => r.title === file.name.split(".")[0]
        );
        const resumeToPatchId = result[found].id;
        const newRevision = (result[found].revision = (
          parseInt(result[found].revision, 10) + 1
        ).toString());
        const payload = {
          revision: newRevision,
          title: result[found].title
        };

        try {
          await resumesAPI.patchResumeRevision(resumeToPatchId, payload);
        } catch (e) {
          toast.error("Failed to edit resume revision");
        }
        const res = (await resumesAPI.getResumesUser(userInfo._id)).data;
        setUserResumes(res);
      }
    }
  };

  const handleResumeUpdate = async (file: any) => {
    if (userInfo) {
      const result = (await resumesAPI.getResumesUser(userInfo._id)).data;
      if (result.some((e: any) => e.title === file.name.split(".")[0])) {
        patchResumeRevisionHandler(file);
      } else {
        postResumeHandler(file);
      }
    }
  };

  const filteredResumes: any[] = userResumes.filter((resume: any) =>
    resume.title.includes(filter)
  );

  const fileSelectedHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = (file: any) => {
    if (file) {
      handleResumeUpdate(file);
    } else {
      throw toast.error("Must choose a file to upload!");
    }
  };

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

        {/* <Button variant="outlined">
          <input type="file" onChange={fileSelectedHandler} />
        </Button> */}

        <InputBase type="file" onChange={fileSelectedHandler} />

        <Button
          variant="outlined"
          color="primary"
          style={{ maxWidth: "100px" }}
          onClick={() => fileUploadHandler(selectedFile)}
        >
          Upload
        </Button>

        {/* <div style={{ paddingTop: "40px" }}>
          <FilePond
            
            onprocessfile={(items: any, err: any) => {
              // handleResumeUpdate(items[0]);
              console.log(items);
            }}
            server="https://httpbin.org/post"
            allowRevert={false}
          />
        </div> */}
      </Grid>
    </Wrapper>
  );
};

export default withStyles(styles)(Upload);
