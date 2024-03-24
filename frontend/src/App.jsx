import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, NewMeetingPage, MeetingPage } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-meeting/:id" element={<NewMeetingPage />} />
        <Route path="/meeting/:id" element={<MeetingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
