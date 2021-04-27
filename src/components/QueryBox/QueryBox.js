import React, { useContext, useEffect, useRef, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import { IconButton, makeStyles } from '@material-ui/core';
import { Mic, MicNone } from '@material-ui/icons';
import { AppContext } from '../../AppContext';
import './QueryBox.scss';
import Listening from '../utilities/Listening';

const useStyles = makeStyles((theme) => ({
    form: {
        position: "relative",
        width: `100%`,
        display: 'flex',
        justifyContent: 'center'
    },
    querybox: {
      //marginLeft: 'auto',
         width: `100%`,
         backgroundColor: '#fff',
        //  paddingLeft: '40px',
        //only remove this if require
        // [theme.breakpoints.down('xs')]: {
        //     display: 'none',
        // },
      //   [theme.breakpoints.down('md')]: {
      //     display: 'none',
      // },
      position: 'relative',
    },
    button: {
        position: 'relative',
        right: 56,
        '&:focus': {
          outline: 'none !important'
        },
    },
    mic: {
        //position: 'relative',
        //right: 40,
        fontSize: 24,
        color: '#333',
        '&:focus': {
          outline: 'none !important'
        },
    },
    michold: {
      //position: 'relative',
      //right: 40,
      fontSize: 24,
      color: 'red',
      '&:focus': {
        outline: 'none !important'
      },
    },
    input: {
        width: '100%',
        //borderRadius: 24,
        backgroundColor: 'white',
        border: '1px solid transparent',
        fontSize: 20,
        //boxShadow: '0 2px 5px 1px rgb(64 60 67 / 16%)',
        padding: '6px 0px 6px 14px',
        '&:focus': {
          borderColor: '#80bdff',
          outline: 'none !important'
        },
    }
}))

const QueryBox = ({pushChat, username, botName, botAlias, sessionAttributes}) => {
    const classes = useStyles();

    const { messages, setMessages, isPreviousMessagesLoaded, voiceState, setVoiceState, setIsWaiting } = useContext(AppContext)

    const [message, setMessage] = useState("");
    
    const textInputRef = useRef();

    const [isStopConversationRequested, setIsStopConversationRequested] = useState(false);
    // const [voiceState, setVoiceState] = useState("passive");
    const [isStopConversationButtonVisible, setIsStopConversationButtonVisible] = useState(false);
    const [isSpeakButtonVisible, setIsSpeakButtonVisible] = useState(true);
    const voiceStateInRef = useRef("passive");

    const botResponseErrorRef = useRef(0);

    const hasMessages = () => {
        return messages.length > 0 ? true : false;
      };

    const isMessageFromUser = () => {
       return messages[messages.length - 1].from === "user" ? true : false;
      };

    useEffect(() => {
        const getLastMessage = () => {
          return messages[messages.length - 1];
        };
        const saveBotReply = (botReply) => {
          if (botReply === "error") {
            setMessages([
              ...messages,
              {
                from: "app",
                message: "Your request didn’t get processed, Please go through the below steps",
                type: "error",
              },
            ]);
            return;
          }
          if (isJson(botReply) && !isJsonMessageCorrectFormat(botReply)) {
            setMessages([...messages, { from: "app", message: "Oops something went wrong." }]);
          } else {
            botResponseErrorRef.current = 0;
            setMessages([...messages, { from: "app", message: botReply }]);
            // setIsWaiting(false);
          }
        };
        if (hasMessages() && isMessageFromUser() && isPreviousMessagesLoaded) {
          if (messages[messages.length - 1].platform === "voice") {
            // no op
          } else {
            pushChat(messages[messages.length - 1].message, saveBotReply);
          }
        }
        if (hasMessages() && isMessageFromApp(getLastMessage()) && getLastMessage().type === "error") {
          if (!botResponseErrorRef.current) {
            botResponseErrorRef.current += 1;
            pushChat("hi", saveBotReply);
          }
        }
        // eslint-disable-next-line
      }, [messages]);

     // this is to determine whether stopConversationButton should be displayed or not
  // this is to determine whether speakButton should be displayed or not
  useEffect(() => {
    if (voiceState === "passive") {
      setIsSpeakButtonVisible(true);
      setIsStopConversationButtonVisible(false);
    } else {
      setIsSpeakButtonVisible(false);
      setIsStopConversationButtonVisible(true);
    }
  }, [voiceState]);

  // when the stopConversation is requested
  // stopConversation when the state becomes listening or passive
  useEffect(() => {
    if (isStopConversationRequested && (voiceState === "listening" || voiceState === "passive")) {
      conversation.reset();
      setVoiceState("passive");
      setIsStopConversationRequested(false);
    } else {
      // console.log("waiting");
      // no op
    }
    // eslint-disable-next-line
  }, [voiceState, isStopConversationRequested]);

  const config = {
    lexConfig: {
      botName: botName,
      botAlias: botAlias,
      userId: username,
    },
  };

  let conversation;

  try {
    conversation = new window.LexAudio.conversation(
      config,
      function (state) {
        if (state === "Listening") {
          setVoiceState("listening");
          voiceStateInRef.current = "listening";
        }
        if (state === "Sending") {
          voiceStateInRef.current = "sending";
          setVoiceState("sending");
        }
        if (state === "Speaking") {
          voiceStateInRef.current = "speaking";
          setVoiceState("speaking");
        }
        if (state === "Passive") {
          voiceStateInRef.current = "passive";
          setVoiceState("passive");
        }
      },
      function (data) {
        const filteredMessage = data.message.replace(/(\r\n|\n|\r)/g, "");
        setMessages((state) => [
          ...state,
          {
            from: "user",
            message: data.inputTranscript,
            platform: "voice",
          },
          {
            from: "app",
            message: filteredMessage,
          },
        ]);
      },
      function (error) {
        setMessages((state) => [
          ...state,
          { from: "app", message: "Oops! Something went wrong. Please try saying that again." },
        ]);
      },
      function (timeDomain, bufferLength) {
        // console.log(bufferLength);
      }
    );
  } catch (error) {
    setMessages([...messages, { from: "app", message: "Oops! Something went wrong" }]);
  }

  const stopConversationClickHandler = () => {
    setIsStopConversationRequested(true);
  };

  const speakButtonClickHandler = () => {
    if (voiceState === "passive") {
      conversation.advanceConversation();
    } else {
      console.log("speakButton clicked but will be ignored");
    }
  };

  const voiceButtonClass = () => {
    if (voiceState === "passive") {
      return "btn query-box__button query-box__button--voice";
    } else {
      return "btn query-box__button query-box__button--voice";
    }
  };

    //   const getMessageObject = (message) => {
    //     return JSON.parse(message).Result;
    //   };

      const isJson = (message) => {
        try {
          JSON.parse(message);
        } catch (error) {
          return false;
        }
        return true;
      };
    
      const isJsonMessageCorrectFormat = (message) => {
        if (!isJson(message)) {
          return false;
        }
        const parsedMessage = JSON.parse(message);
        if (!parsedMessage.Result) {
          console.log("no result property");
          return false;
        }
        if (!parsedMessage.Result.Button) {
          console.log("no button property");
          return false;
        }
        if (!parsedMessage.Result.Text) {
          console.log("no text property");
          return false;
        }
        return true;
      };
    
      const isMessageFromApp = (message) => {
        return JSON.stringify(message.from) === JSON.stringify("app") ? true : false;
      };
    

    const submitHandler = (e) => {
        e.preventDefault();
        if (message && message !== "") {
            const userMessage = {
              from: "user",
              message: message,
            };
            setMessages([...messages, userMessage]);
            setMessage("");
            // setIsWaiting(true);
          } else {
            return;
          }
    }

    const stopConversationButton = isStopConversationButtonVisible ? (
        <IconButton className={classes.michold} onClick={stopConversationClickHandler}><Mic fontSize="large"/></IconButton> 
    ) : null;
  
    const isSpeakButtonDisabled = voiceState === "passive" ? false : true;
  
    const speakButton = isSpeakButtonVisible ? (     
        <IconButton className={classes.mic} onClick={speakButtonClickHandler} disabled={isSpeakButtonDisabled} ><MicNone fontSize="large"/></IconButton>
    ) : null;

    return (
        <div className={classes.querybox}>
          {voiceState === "listening" ? (
            <Listening/>
          ) : null}
            <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
                <input type="text" value={message} ref={textInputRef} className= {classes.input} onChange={(e) => {
            setMessage(e.target.value);
          }}/>
                {/* <IconButton className={classes.button} type="submit"><SendIcon/></IconButton> */}
                {/* <IconButton className={classes.mic} ><MicNone fontSize="large"/></IconButton> */}
                {speakButton}
                {stopConversationButton}
            </form>
        </div>
    )
}

export default QueryBox
