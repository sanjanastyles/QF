import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BASE_PATH } from '../constants/constant';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (userId) {
            const socket = io(BASE_PATH, {
                query: {
                    userId: userId,
                },
            });

            setSocket(socket);
            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            });

            return () => socket && socket.close();
        }
    }, [userId]);

    const setSocketUserId = (id) => {
        setUserId(id);
    };

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, setSocketUserId }}>
            {children}
        </SocketContext.Provider>
    );
};
