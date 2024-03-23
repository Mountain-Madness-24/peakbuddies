# peakbuddies

## Overview
PeakBuddies App is designed to revolutionize the networking experience for students and participants at hackathons. Inspired by the spontaneous nature of the BeReal app, this app aims to create meaningful connections through a novel "speed networking" approach. At predetermined times, participants receive a ping to meet another person they are matched with, based on their interests and profiles. The app facilitates these meetings by providing profiles, logistics, and conversation prompts, ensuring participants can make the most out of these interactions.

## Features

### Profiles
- Integration with LinkedIn to pull information manually for the initial version.
- Display of name, email, LinkedIn profile link, relevant experience, and picture.

### Organizational Tools
- Setup of predetermined meeting rooms by event organizers.
- Generation of QR codes and links for participants to opt-in.

### Networking Mechanism
- A "speed dating" format where participants exchange LinkedIn profiles, receive conversation prompts from ChatGPT, and have timed interactions.
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
To use the Hackathon Networking App, organizers must first set up the event in the system, including meeting rooms and schedules. Participants can then join using the provided QR code or link, complete their profiles, and prepare for a unique networking experience designed to build meaningful professional connections.

