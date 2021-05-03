import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Feed from "./components/Feed/Feed";
import BlogList from "./components/Blog/BlogList/BlogList";
import { Box, Typography } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import { useContext } from "react";
import BlogPost from "./components/Blog/BlogPost/BlogPost";

const notFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4">404 Not Found</Typography>
      <Link to="/">Go Back to Home</Link>
    </Box>
  );
};

const Routes = () => {
  const { state } = useContext(AuthContext);
  return (
    <>
      {state.isAuthenticated ? (
        <Router>
          <Switch>
            <Route path="/feed" exact component={Feed} />
            <Route path="/blogs" exact component={BlogList} />
            <Route path="/blogs/:slug" exact component={BlogPost} />
            <Route path="/" exact>
              <Redirect to="/feed" />
            </Route>
            <Route path="*" component={notFound} />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/blogs" exact component={BlogList} />
            <Route path="/blogs/:slug" exact component={BlogPost} />
            <Route path="/" exact component={Home} />
            <Route path="*" component={notFound} />
          </Switch>
        </Router>
      )}
    </>
  );
};

function App() {
  return (
    <AuthContextProvider>
      <div className="app">
        <Routes />
        <ToastContainer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
