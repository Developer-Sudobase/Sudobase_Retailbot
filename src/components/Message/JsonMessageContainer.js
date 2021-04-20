import React, { useContext } from "react";

import JsonMessage from "./JsonMessage/JsonMessage";

import { AppContext } from "../../AppContext";

import {
  getDecomposedJsonMessage,
} from "../utilities/jsonMessageHelper";
import { Button, makeStyles } from "@material-ui/core";

  const useStyles = makeStyles((theme) => ({
    buttonUi: {
      color: "#333",
      margin: theme.spacing(0.5),
        '&:hover': {
            backgroundColor: 'rgb(255,226,104)',
            },
        '&:focus': {
          outline: 'none !important'
        }
    }
  }))

const JsonMessageContainer = (props) => {

  const classes = useStyles();
  const { messages, setMessages } = useContext(AppContext);

  const { buttons, texts } = getDecomposedJsonMessage(props.message);

  const getButtonsUi = (buttons) => {
    return (
      <div
        className="buttons position-relative"
        style={{ marginRight: "-.5rem", marginLeft: "-.5rem", paddingRight: ".5rem", paddingLeft: ".5rem" }}
      >
        <div className="overlay overlay--buttons"></div>
        {buttons.map((button, index) => {
          const buttonFirstKey = Object.keys(button);
          console.log(buttonFirstKey);
          return (
            <Button variant="contained"
              onClick={() => {
                setMessages([...messages, { from: "user", message: button[buttonFirstKey].value }]);
              }}
              key={index}
              className={classes.buttonUi}
            >
              {button[buttonFirstKey].key}
            </Button>
          );
        })}
      </div>
    );
  };

  const getTextsUi = (texts) => {
    return (
      <div
        className="py-4 position-relative"
        style={{ marginRight: "-.5rem", marginLeft: "-.5rem", paddingRight: ".5rem", paddingLeft: ".5rem" }}
      >
        <div className="overlay overlay--texts"></div>
        {texts.map((text, index) => {
          const textFirstKey = Object.keys(text);
          return <div key={index}>{text[textFirstKey].value}</div>;
        })}
      </div>
    );
  };

  return (
    <JsonMessage
      buttons={getButtonsUi(buttons)}
      texts={getTextsUi(texts)}
    />
  );
};

export default JsonMessageContainer;
