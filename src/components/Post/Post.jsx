import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Post.css";
import { AuthContext } from "../../store/AuthContext";
import { likeDislike } from "../../apis/feed";
import { toast } from "react-toastify";
import { BookmarkBorder, FavoriteBorder } from "@material-ui/icons";

function Post({ dog, isDemo }) {
  const { state } = useContext(AuthContext);
  const { age, breed, likes, name, photoURL, user, description, _id } = dog;
  const [likeCounter, setLikeCounter] = useState(likes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLikes = () => {
    setIsLiking(true);
    likeDislike(_id).then((response) => {
      if (response.errors) {
        return response.errors.map((err) => toast.error(err.msg));
      }
      if (response.message) {
        toast(`🎉 ${response.message}`);
      }
      const {
        dog: { likes },
      } = response;
      setLikeCounter(likes);
      setIsLiking(false);
    });
  };

  return (
    <div className="post">
      <Box className="post_Header" boxShadow={3}>
        <Avatar src={user.photoURL} />
        <Typography variant="h6" className="post_HeaderName">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
      </Box>
      {/* <img className="post__Image" src="/assets/images/dog_post.jpg" /> */}
      <img className="post__Image" src={photoURL} alt={name} />
      <div className="post__footer">
        <div className="post__actions">
          <div
            style={{
              display: "flex",
              WebkitAlignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              title="Like"
              disabled={isLiking}
              onClick={() => !isDemo && handleLikes()}
            >
              {isDemo || likeCounter.includes(state.user._id) ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>{" "}
            {isLiking ? (
              <CircularProgress size="7px" />
            ) : (
              <Typography variant="h6" component="b">
                {isDemo ? 1269 : likeCounter.length}
              </Typography>
            )}
          </div>
          <IconButton title="Save">
            <BookmarkBorder />
          </IconButton>
          <IconButton title="Chat">
            <ChatIcon />
          </IconButton>
          <IconButton title="More">
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="post__footerText post__footer">
          <Typography variant="body1" className="text-bold">
            {`${name}  - `}{" "}
            <Typography variant="body2" component="i">
              {`${breed} - ${age}`}
            </Typography>
          </Typography>
          <Typography variant="body1" className="text-bold">
            {`${user}  - `}{" "}
            <Typography variant="body2" component="i">
              {`${name} - ${location}`}
            </Typography>
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </div>
      </div>
    </div>
  );
}

export default Post;
