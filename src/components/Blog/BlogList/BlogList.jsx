import React, { useEffect, useState } from "react";
import moment from "moment";
import { Box, CircularProgress, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import Header from "components/Header/Header";
import BlogListItem from "../BlogListItem/BlogListItem";
import { getBlogsFeed } from "apis/blog";
import "./BlogList.css";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBlogsFeed().then((response) => {
      if (response.errors) {
        setLoading(false);
        return response.errors.map((err) => toast.error(err.msg));
      }
      const { blogs } = response;
      setBlogs(blogs.reverse());
      setLoading(false);
    });
  }, []);

  return (
    <div className="blogList">
      <Header type="static" color="primary" />
      {loading && (
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          sx={{ width: "100%" }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <Grid item className="blogList__container" container spacing={2}>
        {blogs.map((blogPost) => (
          <BlogListItem
            key={blogPost._id}
            title={blogPost.title}
            date={moment(blogPost.created_date).format("LLL")}
            user={`${blogPost.user.firstName} ${blogPost.user.lastName}`}
            description={blogPost.description}
            slug={blogPost.slug}
          />
        ))}
      </Grid>
    </div>
  );
}

export default BlogList;
