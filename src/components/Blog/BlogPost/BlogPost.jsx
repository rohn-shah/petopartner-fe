import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { getBlogBySlug } from "../../../apis/blog";
import Header from "../../Header/Header";
import "./BlogPost.css";

function BlogPost() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    setLoading(true);
    getBlogBySlug(slug).then((response) => {
      if (response.errors) {
        setLoading(false);
        return response.errors.map((err) => toast.error(err.msg));
      }
      setBlog(response.blog);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="blogPost">
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
      {blog && (
        <Box
          display="flex"
          flexDirection="column"
          height="100vh"
          width="50vw"
          marginTop="20px"
          borderRadius="10px"
        >
          <Box
            display="flex"
            flexDirection="column"
            margin="20px"
            borderBottom="1px solid rgba(0,0,0,0.2)"
          >
            <Typography variant="h4">{blog.title}</Typography>
            <Typography variant="subtitle1">{`${blog.user.firstName} ${blog.user.lastName} - ${blog.created_date}`}</Typography>
          </Box>
          <Box display="flex" flex={1} margin="20px">
            <div dangerouslySetInnerHTML={{ __html: blog.body }} />
          </Box>
        </Box>
      )}
    </div>
  );
}

export default BlogPost;
