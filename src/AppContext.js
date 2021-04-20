import React, { useState, useRef } from "react";
import useMessages from "./hooks/useMessages";
import useLoginAttempts from "./hooks/useLoginAttempts";
import useCognito from "./hooks/useCognito";
import { useIdleTimer } from "react-idle-timer";
import TimeoutPrompt from './components/TimeoutPrompt/TimeoutPrompt';
import useConfig from './hooks/useConfig';
import useLex from "./hooks/useLex";

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {

    const [isModelOpen, setIsModelOpen] = useState(false);

    const { messages, setMessages, isPreviousMessagesLoaded } = useMessages();

    const { getLoginAttempts, incrementLoginAttempts, resetLoginAttempts } = useLoginAttempts();

    const [voiceState, setVoiceState] = useState("passive");


    const toggleModelState = () => {
        setIsModelOpen(!isModelOpen)
        console.log('clicked');
    }

    const {
        signIn,
        signOut,
        register,
        deleteAccount,
        verifyAccount,
        registrationStatus,
        isLoggedIn,
        username,
        email,
        resetPassword,
        confirmPassword,
        cognitoUser,
        currentUser,
        userIdleTime,
        userSub,
      } = useCognito({ setMessages });

      const {
        sessionTimeOutInMinutes,
        sessionTimeOutMessage,
        forceLogoutAfterTimeOutInMinutes,
      } = useConfig().app;

      const { pushChat, botName, botAlias } = useLex({ username });


      const [isUserTimedOut, setIsUserTimedOut] = useState(false);

      const sessionTimeoutTime = 1000 * 60 * sessionTimeOutInMinutes || 1000 * 60 * 20;
      const forceLogoutTime = 1000 * 60 * forceLogoutAfterTimeOutInMinutes || 1000 * 60 * 2;
  
      const signOutTimer = useRef();
  
      const handleOnIdle = (event) => {
          setIsUserTimedOut(true);
          console.log("user timed out signing off in 10 seconds");
          clearTimeout(signOutTimer.current);
          signOutTimer.current = setTimeout(() => signOutHandler(true), forceLogoutTime);
        };
  
      const stayLoggedInClickHandler = () => {
          console.log("user chose to stay logged in. waiting to time out again");
          clearTimeout(signOutTimer.current);
          setIsUserTimedOut(false);
        };
  
      const { getLastActiveTime, getRemainingTime } = useIdleTimer({
          timeout: sessionTimeoutTime,
          onIdle: handleOnIdle,
          debounce: 500,
        });

        const signOutHandler = (shouldPreserveMessages) => {
          if (shouldPreserveMessages === true) {
            // no op
          } else {
            setMessages([]);
            localStorage.removeItem("transcript");
            // console.log("user got forcefully logged out");
          }
          clearTimeout(signOutTimer.current);
            signOut();
          };
  
      const timeoutPrompt = isUserTimedOut ? (
          <TimeoutPrompt
            stayLoggedInHandler={stayLoggedInClickHandler}
            signOutHandler={() => signOutHandler()}
            message={sessionTimeOutMessage}
          />
        ) : null;    

    return (
        <AppContext.Provider
            value={{
                messages,
                isPreviousMessagesLoaded,
                setMessages,
                isModelOpen,
                setIsModelOpen,
                toggleModelState,
                signIn,
                signOut,
                register,
                deleteAccount,
                verifyAccount,
                registrationStatus,
                isLoggedIn,
                username,
                email,
                resetPassword,
                confirmPassword,
                getLoginAttempts,
                incrementLoginAttempts,
                resetLoginAttempts,
                cognitoUser,
                currentUser,
                userIdleTime,
                userSub,
                timeoutPrompt,
                pushChat,
                botName,
                botAlias,
                voiceState,
                setVoiceState,
                signOutHandler,
            }}
        >
            {children}
        </AppContext.Provider>
    );

};
export default AppContextProvider;