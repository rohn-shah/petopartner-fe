import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { EmailOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import PetsIcon from "@material-ui/icons/Pets";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { login } from "../../apis/auth";
import { AuthContext } from "../../store/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const onLoginSubmit = () => {
    const payload = { email, password };
    login(payload).then((response) => {
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
    <div className="login">
      <Card style={{ height: "85vh", width: "70vw" }}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <form className="login__form">
              <PetsIcon
                className="login__formLogo"
                onClick={() => history.push("/")}
              />
              <Typography variant="h5" className="login__formTitle">
                Login
              </Typography>
              <div className="login__formArea">
                <FormControl variant="outlined" className="login__formInput">
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <EmailOutlined fontSize="small" />
                      </InputAdornment>
                    }
                    labelWidth={40}
                  />
                  <FormHelperText id="email-helper-text"></FormHelperText>
                </FormControl>
                <FormControl variant="outlined" className="login__formInput">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  <FormHelperText id="password-helper-text"></FormHelperText>
                </FormControl>
                <Button
                  className="login__formInput"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() =>{
                    setLoading(true)
                    return  onLoginSubmit()}}
                >
                  {loading ? `Loading...` : `Login`}
                </Button>
                <Typography>
                  Not a member? <Link to="/signup">Signup</Link>
                </Typography>
              </div>
            </form>
          </Grid>
          <Grid item xs={6}>
            <img
              src="/assets/images/dog_login.jpg"
              alt="dog_login"
              style={{
                marginTop: "-40px",
                width: "100%",
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

export default Login;
