import React, { Component, createContext } from "react";
import { Router } from "@reach/router";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import PasswordReset from "../components/PasswordReset";
import { auth, generateUserDocument } from "../firebase/firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
    loading:true
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user:user,loading:false });
    });
  };

  render() {
    const {user,loading}=this.state;
    return (
      <UserContext.Provider value={user}>
          {
            loading ? <div> loading page ....</div>
            :
            (user ? this.props.children :
            <Router>
                <SignUp path="signUp" />
                <SignIn path="/" />
                <PasswordReset path="passwordReset" />
            </Router>)
          }
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
