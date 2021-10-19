import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { addPost } from "apis/post";
import { toast } from "react-toastify";

function AddNewPet({ open, handleClose, handleCloseSave }) {
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <Dialog
      disableBackdropClick
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
      fullWidth={true}
    >
      <Formik
        initialValues={{
          name: "",
          age: "",
          breed: "",
          photoURL: "",
          description: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is Required"),
          age: Yup.number()
            .required("Age is Required")
            .positive("Age must be greater than 1")
            .integer(),
          breed: Yup.string().required("Breed is Required"),
          photoURL: Yup.string().required("Photo is Required"),
          description: Yup.string().required("Description is Required"),
        })}
        onSubmit={(values) => {
          addPost(values).then((response) => {
            if (response.errors) {
              return response.errors.map((err) => toast.error(err.msg));
            }
            toast.success("New Dog Added Successfully");
            handleCloseSave();
          });
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Add New Pet
            </DialogTitle>
            <DialogContent dividers>
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px" }}
                error={touched.name && errors.name ? true : false}
              >
                <InputLabel htmlFor="form-name">Name</InputLabel>
                <OutlinedInput
                  id="form-name"
                  type="text"
                  value={values.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  labelWidth={45}
                />
                <FormHelperText
                  error={touched.name && errors.name ? true : false}
                  id="name-helper-text"
                >
                  {touched.name && errors.name ? errors.name : null}
                </FormHelperText>
              </FormControl>

              <Grid container spacing={1}>
                <Grid item sm={4} md={4} lg={4}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    error={touched.age && errors.age ? true : false}
                  >
                    <InputLabel htmlFor="form-age">Age</InputLabel>
                    <OutlinedInput
                      id="form-age"
                      type="number"
                      value={values.age}
                      onChange={handleChange("age")}
                      onBlur={handleBlur("age")}
                      labelWidth={30}
                    />
                    <FormHelperText
                      error={touched.age && errors.age ? true : false}
                      id="age-helper-text"
                    >
                      {touched.age && errors.age ? errors.age : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item sm={8} md={8} lg={8}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    error={touched.breed && errors.breed ? true : false}
                  >
                    <InputLabel htmlFor="form-breed">Breed</InputLabel>
                    <OutlinedInput
                      id="form-breed"
                      type="text"
                      value={values.breed}
                      onChange={handleChange("breed")}
                      onBlur={handleBlur("breed")}
                      labelWidth={45}
                    />
                    <FormHelperText
                      error={touched.breed && errors.breed ? true : false}
                      id="breed-helper-text"
                    >
                      {touched.breed && errors.breed ? errors.breed : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px" }}
                error={touched.description && errors.description ? true : false}
              >
                <InputLabel htmlFor="form-description">Description</InputLabel>
                <OutlinedInput
                  id="form-description"
                  multiline={true}
                  rows={5}
                  rowsMax={5}
                  type="text"
                  value={values.description}
                  onChange={handleChange("description")}
                  onBlur={handleBlur("description")}
                  labelWidth={85}
                />
                <FormHelperText
                  error={
                    touched.description && errors.description ? true : false
                  }
                  id="description-helper-text"
                >
                  {touched.description && errors.description
                    ? errors.description
                    : null}
                </FormHelperText>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px" }}
                error={touched.photoURL && errors.photoURL ? true : false}
              >
                {touched.photoURL && values.photoURL ? (
                  <img
                    alt={values.name}
                    src={values.photoURL}
                    style={{
                      widht: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={async (event) => {
                      const file = event.target.files[0];
                      const imageData = await convertToBase64(file);
                      setFieldValue("photoURL", imageData);
                    }}
                    onBlur={handleBlur("photoURL")}
                  />
                )}
                <FormHelperText
                  error={touched.photoURL && errors.photoURL ? true : false}
                  id="photoURL-helper-text"
                >
                  {touched.photoURL && errors.photoURL ? errors.photoURL : null}
                </FormHelperText>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="primary"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? <CircularProgress size="14px" /> : "Add"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

export default AddNewPet;
