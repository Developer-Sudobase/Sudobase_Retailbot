import React, { useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core'
import ProductsUi from '../Products/ProductUI/ProductsUi';
import Buttons from '../Products/ButtonUi/Buttons';
import DetailView from '../Products/DetailView/DetailView';
import TextMessage from './TextMessage/TextMessage';
import { isMessageJson } from '../utilities/jsonMessageHelper';
import JsonMessageContainer from './JsonMessageContainer';
import MessageBubble from './MessageBubble/MessageBubble';

const useStyles = makeStyles((theme) => ({
    cards: {
        display: 'flex',
    },
    view: {
        maxWidth: '1200px',
        width: '100%',
        margin: '100px auto',
        boxShadow: '0 0 5px #ccc',
    }
}))

const Message = ({ message, isLast }) => {
    const classes = useStyles()

    const ref = useRef();

    useEffect(() => {
      if (ref.current) {
        setTimeout(() => {
          if (ref.current) ref.current.scrollIntoView({ block: "end", behavior: "smooth" });
        }, 100);
      }
    }, []);

    const renderMessage = () => {
        if (isMessageJson(message.message)) {
          return <JsonMessageContainer message={message.message} />;
        } else {
          return <TextMessage message={message.message} />;
        }
      };
    
      const messageAdditionalClasses = isLast ? " message--last" : "";

    return (
        // <>
        // {/* <div className={classes.cards}><ProductsUi/></div>
        // <div className={classes.button}><Buttons/></div>
        // <div className={classes.view}><DetailView/></div> */}
        // <TextMessage message={message.message}/>
        // </>
        <div className={"message" + messageAdditionalClasses} ref={ref}>
        <MessageBubble from={message.from}>{renderMessage()}</MessageBubble>
        </div>
    )
}

export default Message
