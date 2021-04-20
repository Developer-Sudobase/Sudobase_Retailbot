  export const getButtonsFromMessage = (message) => {
    let buttons = [];
    return buttons;
  };
  
  export const getTextFromMessage = (message) => {
    let texts = [];
    return texts;
  };
  
  export const isMessageJson = (message) => {
    try {
      JSON.parse(message);
    } catch (error) {
      return false;
    }
    return true;
  };
  
  export const isArray = (jsonItem) => {
    if (Array.isArray(jsonItem)) {
      return true;
    }
    return false;
  };
  
  export function getMessageSource(message) {
    return message.from;
  }
  
  export const isMessageFromUser = (message) => {
    if (message.from === "user") {
      return true;
    } else {
      return false;
    }
  };
  
  export const getDecomposedJsonMessage = (message) => {
    const jsonResult = JSON.parse(message).Result;
    const buttons = jsonResult.Button;
    const texts = jsonResult.Text;
  console.log(jsonResult);
    return {
      buttons,
      texts,
    };
  };
