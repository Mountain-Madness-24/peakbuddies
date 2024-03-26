# PeakBuddies


[Presentation and demo video](https://www.youtube.com/watch?v=M34-pgFZEl0)

[How-to video guide for how to run the project](https://www.youtube.com/watch?v=tj4PorYr8rk)

[Figma file with design mockups and presentation slides](https://www.figma.com/file/sNTuEKn0MNzwCzCWRfSvfE/Mountain-Madness-2024?type=design&node-id=114%3A2&mode=design&t=edgCm4i6Q9mrTAAp-1)

## How to run the app

### Frontend
1. Change directory to `frontend/`
2. `npm i`
3. Create a `.env` file in the root of the frontend directory (we emailed values to Patrick)
4. `npm run dev`
5. Open `localhost:5173` in a browser

### Backend
1. Change directory to `backend/`
2. `npm i`
3. Create a `.env` file in the root of the backend directory (we emailed values to Patrick)
4. `npm run start`


## Overview
PeakBuddies App is designed to revolutionize the networking experience for students and participants at hackathons. Inspired by the spontaneous nature of the BeReal app, this app aims to create meaningful connections through a novel "speed networking" approach. At predetermined times, participants receive a ping to meet another person they are matched with. The app facilitates these meetings by providing profiles, logistics, and conversation prompts, ensuring participants can make the most out of these interactions. The App uses an special API for indoor places to assure students can find the random meeting spot adding a twist to the networking where student would be exploring different parts of the university based on the organizers planning. 

## Features

### Profiles
- Integration with LinkedIn to pull information manually for the initial version.
- Display of name, email, LinkedIn profile link, relevant experience, and picture.

### Organizational Tools
- Setup of predetermined meeting rooms by event organizers.
- Generation oflinks for participants to opt-in.

### Networking Mechanism
- A "speed dating" format where participants exchange LinkedIn profiles, receive conversation prompts, and have timed interactions.
- An option to explore other participants' profiles and request connections, facilitating the expansion of one's professional network.

### Pages
- Sign-up/log in
- User profile and history
- Hackathon event and participants pages

### Database Structure
- **Users**: First Name, Last Name, Email, LinkedIn Link, Experience, Pictures, # People Met, Interests tags, isOrganizer, Bio, Contact info, Availability, List of people met
- **Meeting**: Location, Lat/Long, Random action, Starting time, Icebreaker questions, Event Status, Members, isFinished, meetingId
- **Hackathon Information**: Event Join Link, Admins, Name, Description, Important links, Meeting rooms, Start/End dates, Interval of ping, isStarted, isFinished

### Backend Endpoints
- **/user**: for login, sign-up, and user listing.
- **/meetings**: for meeting management, participant notification, and meeting lifecycle updates.
- **/hackathons**: for hackathon creation, updates, and location posting.

## User Flows

### Participant
1. Join the event via QR code or link.
2. Sign in with LinkedIn and fill in additional information.
3. Navigate through an onboarding screen explaining app usage.
4. Receive notifications for matches with a vague schedule.
5. Meet with matches following the structured interaction format: introductions, discussion prompts, free time, and LinkedIn connections.

### Organizer
1. Create a new hackathon event, inputting relevant information.
2. Generate and distribute a QR code or link for participant registration.
3. Manage participant registrations and oversee the event's start and end.

## Getting Started
To use the Hackathon Networking App, organizers must first set up the event in the system, including meeting rooms and schedules. Participants can then join using the provided link, complete their profiles, and prepare for a unique networking experience designed to build meaningful professional connections.

