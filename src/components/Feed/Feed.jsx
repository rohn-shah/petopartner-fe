import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { toast } from "react-toastify";
import { getMainFeed } from "apis/feed";
import AddNewPet from "../Forms/AddNewPet";
import Header from "../Header/Header";
import Post from "../Post/Post";
import "./Feed.css";

function Feed() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddPetForm, setOpenAddPetForm] = useState(false);

  const fetchDogs = () => {
    setLoading(true);
    getMainFeed().then((response) => {
      if (response.errors) {
        setLoading(false);
        return response.errors.map((err) => toast.error(err.msg));
      }
      const { dogs } = response;
      setDogs(dogs.reverse());
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getMainFeed().then((response) => {
      if (response.errors) {
        setLoading(false);
        return response.errors.map((err) => toast.error(err.msg));
      }
      const { dogs } = response;
      setDogs(dogs.reverse());
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="feed">
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
        <div className="feed__posts">
          {dogs &&
            dogs.map((dog) => (
              <div className="feed__post" key={dog._id}>
                <Post dog={dog} />
              </div>
            ))}
        </div>
      </div>
      <Box position="fixed" bottom="15px" right="25px" left="auto">
        <Fab
          color="primary"
          title="Add"
          onClick={() => setOpenAddPetForm(true)}
        >
          <Add />
        </Fab>
      </Box>
      {openAddPetForm && (
        <AddNewPet
          open={openAddPetForm}
          handleClose={() => setOpenAddPetForm(false)}
          handleCloseSave={() => {
            fetchDogs();
            return setOpenAddPetForm(false);
          }}
        />
      )}
    </>
  );
}

export default Feed;
