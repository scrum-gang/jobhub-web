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

  const mappedResumes = userResumes.map((r: any, i: any) => {
    return {
      filename: r.title,
      filenameWithoutExtension: r.revision,
      id: r.id
    };
  });

  console.log("user res before delete: ", userResumes);
  console.log("mapped res before delete: ", mappedResumes);

  const deleteResumeHandler = async (index: any) => {
    const newResumes = [...userResumes];
    const toDelete : any = newResumes[index];
    newResumes.splice(index, 1);

    if (userInfo) {
      await resumesAPI.deleteResumeUser(
        userInfo._id,
        toDelete.title,
        toDelete.revision
      );
    }
    
    setUserResumes(newResumes);
    console.log("to delete ", toDelete)
    console.log("newResumes: ", newResumes)
    console.log("mappedResumes: ", mappedResumes)
    console.log("state: ", userResumes)
  };



  const filteredResumes : any[] = userResumes.filter((resume: any) =>
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
              <TableCell>Revision Number</TableCell>
              <TableCell>Uploaded At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredResumes.map((resume:any, index:any) => (
              <TableRow key={resume.title}>
                <TableCell key={index}>
                  <Typography>{filteredResumes[index].title}</Typography>
                </TableCell>

                <TableCell>xxx</TableCell>

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
