import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../../apis/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../store/AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const { dispatch } = useContext(AuthContext);

  const onSignupSubmit = () => {
    const firstName = name.split(" ")[0];
    const lastName = name.replace(firstName, "") || undefined;
    const payload = {
      firstName,
      lastName,
      email,
      password,
    };
    signup(payload).then((response) => {
      if (response.errors) {
        return response.errors.map((err) => toast.error(err.msg));
      }
      const { user, access_token } = response;
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token: access_token,
        },
      });
      history.push("/feed");
    });
  };

  return (
    <div className="signup">
      <Card style={{ height: "85vh", width: "70vw" }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} lg={6} md={12}>
            <form className="signup__form">
              <PetsIcon
                className="signup__formLogo"
                onClick={() => history.push("/")}
              />
              <Typography variant="h5" className="signup__formTitle">
                Signup
              </Typography>
              <div className="signup__formArea">
                <FormControl variant="outlined" className="signup__formInput">
                  <InputLabel htmlFor="outlined-adornment-name">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="name"
                    labelWidth={40}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormHelperText id="name-helper-text"></FormHelperText>
                </FormControl>
                <FormControl variant="outlined" className="signup__formInput">
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type="email"
                    labelWidth={40}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormHelperText id="email-helper-text"></FormHelperText>
                </FormControl>
                <FormControl variant="outlined" className="signup__formInput">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type="text"
                    labelWidth={70}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormHelperText id="password-helper-text"></FormHelperText>
                </FormControl>
                <Button
                  className="login__formInput"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => onSignupSubmit()}
                >
                  Signup
                </Button>
                <Typography>
                  Already have an accound? <Link to="/login">Login</Link>
                </Typography>
              </div>
            </form>
          </Grid>
          <Grid item xs={false} sm={false} md={false} lg={6}>
            <img
              src="/assets/images/dog_signup.jpg"
              alt="dog_signup"
              style={{
                width: "100%",
                marginTop: "-110px",
                height: "auto",
                flex: 1,
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default Signup;
