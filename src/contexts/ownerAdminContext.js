import { createContext, useState } from "react";

export const OwnerContext = createContext({
    roomInfo : [],
    setRoomInfo :() => null
    
});

export const OwnerProvider = ({children}) => {
    
    const [roomInfo, setRoomInfo] = useState([]);
    const value = {roomInfo, setRoomInfo};

    return (
        <OwnerContext.Provider value={value}>{children} </OwnerContext.Provider>
    );
};