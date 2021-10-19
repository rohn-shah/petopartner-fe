import React, { useContext, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import PetsIcon from "@material-ui/icons/Pets";
import { AuthContext } from "store/AuthContext";
import "./Header.css";

function Header({ type, color }) {
  const history = useHistory();
  const [openUserMenuAnchorEl, setOpenUserMenuAnchorEl] = useState(null);

  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  return (
    <AppBar position={type} color={color} className="header">
      <Toolbar>
        <div className="header__right">
          <Link to="/" className="link">
            <PetsIcon className="iconPlaceholder" />
            <Typography variant="h6"> Petopartner </Typography>
          </Link>
        </div>
        {state.isAuthenticated ? (
          <>
            <Link to="/blogs" className="link link-margin">
              Blogs
            </Link>
            <Button
              variant="outlined"
              title={`${user.firstName} ${user.lastName}`}
              color="inherit"
              className="header__profileButton"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event) => setOpenUserMenuAnchorEl(event.currentTarget)}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography
                  className="header__userName"
                  variant="body1"
                  component="b"
                >
                  {" "}
                  {`${user.firstName} ${user.lastName}`}{" "}
                </Typography>
                <Avatar
                  className="header__avatar"
                  src={user.photoURL}
                  alt={`${user.firstName} ${user.lastName}`}
                />{" "}
              </Box>
            </Button>
            <Popover
              open={Boolean(openUserMenuAnchorEl)}
              onClose={() => setOpenUserMenuAnchorEl(null)}
              anchorEl={openUserMenuAnchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <List component="nav" dense={true}>
                <ListItem button>
                  <ListItemText secondary="Profile" />
                </ListItem>
                <ListItem button>
                  <ListItemText secondary="Change Password" />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" dense={true}>
                <ListItem
                  button
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    history.push("/login");
                    return setOpenUserMenuAnchorEl(null);
                  }}
                >
                  <ListItemText secondary="Logout" />
                </ListItem>
              </List>
            </Popover>
          </>
        ) : (
          <>
            <Link to="/blogs" className="link link-margin">
              Blogs
            </Link>
            <Button onClick={() => history.push("/login")} variant="contained">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
