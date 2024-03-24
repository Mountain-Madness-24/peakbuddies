import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  LoginPage,
  NewMeetingPage,
  HomePage,
  MeetingPage,
  EventPage,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home/:id" element={<HomePage />} />
        <Route path="/new-meeting/:id" element={<NewMeetingPage />} />
        <Route path="/meeting/:id" element={<MeetingPage />} />
        <Route path="/event/:id" element={<EventPage />} />
        {/* Redirect all unmatched routes to /login */}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
