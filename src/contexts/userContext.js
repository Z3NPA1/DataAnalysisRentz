import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, signOutUser } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { getAnalytics, setUserId } from "firebase/analytics";


const analytics = getAnalytics();

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
    const nav = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  console.log(currentUser);
  

  useEffect(() => {

    if(currentUser && currentUser.emailVerified) {
        
          createUserDocumentFromAuth(currentUser);
          console.log('document created')
          nav('/');

      
    }
    else if(currentUser && currentUser.emailVerified === false) {
        setCurrentUser(null);
        signOutUser();
        alert('please verify your email first')
    }
    if(currentUser){
      const userId = currentUser.uid;
      console.log(userId);
      setUserId(analytics, userId);
    }
  }, [currentUser])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};