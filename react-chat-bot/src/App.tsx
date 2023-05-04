import React, { useState } from "react";
import BotIcon from "./assets/icons/bot.png";
import VueChatBot from "./components/BotUI";
import { messageService } from "./helpers/message";

const App = () => {
  const [messageData, setMessageData] = useState<any>([]);
  const [botTyping, setBotTyping] = useState(false);
  const [inputDisable, setInputDisable] = useState(false);
  const [botOptions] = useState({
    botAvatarImg: BotIcon,
    boardContentBg: "#f4f4f4",
    msgBubbleBgBot: "#fff",
    inputPlaceholder: "Type here...",
    inputDisableBg: "#fff",
    inputDisablePlaceholder: "Hit the buttons above to respond",
  });

  const botStart = () => {
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setMessageData([
        ...messageData,
        { agent: "bot", type: "text", text: "Hello" },
      ]);
    }, 1000);
  };

  const msgSend = (value: any) => {
    setMessageData([
      ...messageData,
      { agent: "user", type: "text", text: value.text },
    ]);
    getResponse();
  };

  const getResponse = () => {
    setBotTyping(true);

    messageService.createMessage().then((response) => {
      const replyMessage = { agent: "bot", ...response };

      setInputDisable(response.disableInput);
      setMessageData([...messageData, replyMessage]);

      setBotTyping(false);
    });
  };

  return (
    <div id="app">
      <img alt="Vue Bot UI" src="./assets/logo.png" />
      <VueChatBot
        options={botOptions}
        messages={messageData}
        botTyping={botTyping}
        inputDisable={inputDisable}
        isOpen={false}
        onInit={botStart}
        onMsgSend={msgSend}
      />
    </div>
  );
};

export default App;