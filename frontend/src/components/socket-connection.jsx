import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const SOCKET_SERVER_URL = 'http://localhost:3000';

export const SocketComponent = ({ userId }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Connect to the socket server
        const socket = io(SOCKET_SERVER_URL, {
            withCredentials: true,
        });

        // Listen to the 'connect' event to log the connection status
        socket.on('connect', () => {
            console.log("Socket connected:", socket.connected); // Now it should log true
        });

        // Listen for 'meetingNotification' event from the server
        socket.on('meetingNotification', (notification) => {
            console.log("Received meetingNotification:", notification); // Log for debugging

            // Redirect if notification includes the expected meetingId
            if(notification && notification.meetingId) {
                navigate(`/new-meeting/${notification.meetingId}`);
            } else {
                console.error("Notification data is missing the meetingId:", notification);
            }
        });

        // Cleanup on component unmount
        return () => {
            socket.off('connect');
            socket.off('meetingNotification');
            socket.disconnect();
        };
    }, [userId]);

    return null; // This component does not render anything itself
};
