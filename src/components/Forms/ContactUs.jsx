import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { addQuery } from "../../apis/home";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";

function ContactUs() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      bgcolor="#f5f5f5"
      borderRadius="10px"
      boxShadow="10px 10px 10px rgba(0,0,0,0.2)"
      height="100vh"
      width="90vw"
    >
      <Grid container spacing={0}>
        <Grid item sm={4} md={4} lg={4}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              message: "",
              email: "",
              contactNo: ""
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required("First Name is Required"),
              email: Yup.string()
                .required("Email is Required")
                .email("Email is invalid"),
              contactNo: Yup.string().required("Contact Number is Required").length( 10, "Contact Number is invalid"),
              message: Yup.string().required("Message is Required"),
            })}
            onSubmit={(values) => {
              return addQuery(values).then((response) => {
                if (response.errors) {
                  return response.errors.map((err) => toast.error(err.msg));
                }
                return toast.success(response.success);
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
            }) => (
              <Box
                display="flex"
                flex={1}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                padding="20px"
              >
                <Typography
                  style={{
                    color: "#3f3f3f",
                    margin: "15px",
                  }}
                  variant="h4"
                  component="h2"
                >
                  Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    error={touched.firstName && errors.firstName ? true : false}
                  >
                    <InputLabel htmlFor="form-firstName">First Name</InputLabel>
                    <OutlinedInput
                      id="form-firstName"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      labelWidth={85}
                    />
                    <FormHelperText
                      error={
                        touched.firstName && errors.firstName ? true : false
                      }
                      id="firstName-helper-text"
                    >
                      {touched.firstName && errors.firstName
                        ? errors.firstName
                        : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    error={touched.lastName && errors.lastName ? true : false}
                  >
                    <InputLabel htmlFor="form-lastName">Last Name</InputLabel>
                    <OutlinedInput
                      id="form-lastName"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      labelWidth={85}
                    />
                    <FormHelperText
                      error={touched.lastName && errors.lastName ? true : false}
                      id="lastName-helper-text"
                    >
                      {touched.lastName && errors.lastName
                        ? errors.lastName
                        : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    error={touched.email && errors.email ? true : false}
                  >
                    <InputLabel htmlFor="form-email">Email</InputLabel>
                    <OutlinedInput
                      id="form-email"
                      type="text"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      labelWidth={45}
                    />
                    <FormHelperText
                      error={touched.email && errors.email ? true : false}
                      id="email-helper-text"
                    >
                      {touched.email && errors.email ? errors.email : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    error={touched.contactNo && errors.contactNo ? true : false}
                  >
                    <InputLabel htmlFor="form-contactNo">Contact Number</InputLabel>
                    <OutlinedInput
                      id="form-contactNo"
                      type="text"
                      value={values.contactNo}
                      onChange={handleChange("contactNo")}
                      onBlur={handleBlur("contactNo")}
                      labelWidth={45}
                    />
                    <FormHelperText
                      error={touched.contactNo && errors.contactNo ? true : false}
                      id="contactNo-helper-text"
                    >
                      {touched.contactNo && errors.contactNo ? errors.contactNo : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    error={touched.message && errors.message ? true : false}
                  >
                    <InputLabel htmlFor="form-message">Message</InputLabel>
                    <OutlinedInput
                      id="form-message"
                      type="text"
                      multiline={true}
                      rows={5}
                      rowsMax={5}
                      value={values.message}
                      onChange={handleChange("message")}
                      onBlur={handleBlur("message")}
                      labelWidth={70}
                    />
                    <FormHelperText
                      error={touched.message && errors.message ? true : false}
                      id="message-helper-text"
                    >
                      {touched.message && errors.message
                        ? errors.message
                        : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    error={touched.message && errors.message ? true : false}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!isValid || isSubmitting}
                    >
                      {isSubmitting ? (
                        <CircularProgress size="24px" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </FormControl>
                </form>
              </Box>
            )}
          </Formik>
        </Grid>
        <Grid
          item
          sm={8}
          md={8}
          lg={8}
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            width: "100%",
            padding: "0px",
          }}
        >
          <img
            style={{
              flex: 1,
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "10px",
            }}
            src="/assets/images/dogs_couple_party.jpg"
            alt="/assets/images/dogs_couple_party.jpg"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactUs;
