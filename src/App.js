import React from "react";
import ProfilePage from "./components/ProfilePage";

import UserProvider from "./providers/UserProvider"

import "./App.css"

function App() {

  return ( 
    <UserProvider>
      <ProfilePage />
    </UserProvider>
  );
}

export default App;
