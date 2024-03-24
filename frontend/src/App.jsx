import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, NewMeetingPage } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-meeting/:id" element={<NewMeetingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
