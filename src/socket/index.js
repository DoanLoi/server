import chatText from "./chat/chatText";
import typingOn from "./chat/typingOn";
import typingOff from "./chat/typingOff";
import chatImage from "./chat/chatImage";

let initSockets = (io) => {
  chatText(io);
};
module.exports = initSockets;
