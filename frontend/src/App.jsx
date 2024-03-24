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
  CreateEventPage,
  OnboardingPage,
  JoinEventPage,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-meeting/:id" element={<NewMeetingPage />} />
        <Route path="/meeting/:id" element={<MeetingPage />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/onboarding/:id" element={<OnboardingPage />} />
        <Route path="/join-event" element={<JoinEventPage />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
