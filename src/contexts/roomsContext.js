import { createContext, useState, useEffect } from "react";

import { roomsMapArray} from "../utils/firebase";


export const RoomsContext = createContext({
    isApproved: '',
    setIsApproved: () => null
});

export const RoomsProvider = ({ children }) => {
    const [isApproved, setIsApproved] = useState({});
    const value = {isApproved, setIsApproved};

    

    // useEffect(() => {
    //     const callRoomsMap = async () => {
    //         try{
    //             const categoryMap = await roomsMapArray();
    //              console.log(categoryMap);
    //              setRooms(categoryMap);

    //         }catch(error){
    //             console.log(error);
    //         }
    //     };
    //     callRoomsMap();
        
    // },[])


    return (
        <RoomsContext.Provider value={value}>
        {children}
        </RoomsContext.Provider>
    );
}

