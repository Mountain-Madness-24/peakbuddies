import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const SOCKET_SERVER_URL = 'http://localhost:3000';

let socket = null;

export const EmitEvent = (eventName, data) => {
    if (!socket) {
        console.error('Socket is not connected');
        return;
    }
    console.log('Emitting event:', eventName, data)
    socket.emit(eventName, data);
}

export const SocketComponent = ({ userId, setPingOtherPerson }) => {
    const navigate = useNavigate();
    useEffect(() => {
        // Connect to the socket server
        socket = io(SOCKET_SERVER_URL, {
            withCredentials: true,
        });

        // Listen to the 'connect' event to log the connection status

        socket.on('connect', () => {
            console.log('userId', userId);
            socket.emit('userLogin', userId);
        })

        // Listen for 'meetingNotification' event from the server
        socket.on('meetingNotification', (notification) => {
            console.log("Received meetingNotification:", notification); // Log for debugging
            
            // Redirect if notification includes the expected meetingId
            if (notification && notification.meetingId) {
                navigate(`/new-meeting/${notification.meetingId}`);
            } else {
                console.error("Notification data is missing the meetingId:", notification);
            }
        });

        socket.on('pingOtherPerson', (notification) => {
            console.log("Received pingOtherPerson:", notification); // Log for debugging
            
            // create window alert
            if (notification) {
                alert(notification);
            } else {
                console.error("Notification data is missing the meetingId:", notification);
            }
        });

        // Cleanup on component unmount
        return () => {
            socket.off('userLogin');
            socket.off('meetingNotification');
            socket.off('pingOtherPerson')
            socket.disconnect();
        };
    }, [userId, navigate]);

    return null; // This component does not render anything itself
};
