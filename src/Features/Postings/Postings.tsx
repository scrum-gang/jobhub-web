import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardContent,
  createStyles,
  Grid,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { format } from "timeago.js";

import postingsAPI, { IPosting2 } from "../../api/postingsAPI";
import { AuthRedirect, Protection } from "../../Shared/Authorization";

const mockData = new Array(9).fill({
  company: "JobHub",
  deadline: new Date(),
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  location: "Montreal, Quebec",
  posting_date: new Date(),
  salary: 60000,
  title: "Software Developer",
});

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: "auto",
      marginTop: 80,
      maxWidth: 600
    }
  });

const Postings: React.FunctionComponent<WithStyles> = ({ classes }) => {
  const [postings, setPostings] = useState<IPosting2[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await postingsAPI.getAllPostings();
      setPostings(data);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.IS_APPLICANT} />
      <Grid
        container
        wrap="wrap"
        spacing={8}
        className={classes.container}
        alignItems="center"
      >
        {postings.map((posting, i) => (
          <Grid item key={posting._id} xs={12} sm={6} md={4}>
            <article>
              <Link to={`/postings/${posting._id}`}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6" component="h1">
                        {posting.title}
                      </Typography>
                      <Typography variant="body1" component="h2">
                        {posting.company}
                      </Typography>
                      <Typography variant="caption">
                        {posting.location}
                      </Typography>
                      <Typography variant="caption">
                        {format(posting.posting_date)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </article>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Postings);
