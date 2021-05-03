import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import "./BlogListItem.css";
import { useHistory } from "react-router";

function BlogListItem({ title, date, description, slug, user }) {
  const history = useHistory();
  return (
    <Grid item xs={12} md={12} lg={12}>
      <CardActionArea
        component="a"
        onClick={() => history.push(`/blogs/${slug}`)}
      >
        <Card>
          <CardContent>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="subtitle1" color="textSecondary">
                {`${user}  -  ${date}`}
              </Typography>
            </Box>
            <Typography variant="subtitle1" paragraph>
              {description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default BlogListItem;
