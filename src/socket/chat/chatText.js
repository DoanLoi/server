import {
  pushSocketIdToArray,
  emitNotifyToArray,
  removeSocketIdFromArray,
} from "./../../config/socketHelper";
let chatText = (io) => {
  //io tu thu vien cua socket.io
  let clients = {}; // bien cuc bo luu tru tat ca socketid cua nguoi dung
  io.on("connection", (socket) => {
    // moi khi co 1 nguoi dung ket nois thi ham nay chay 1 lan
    //luu socketId vao mang client
    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);
    socket.on("chat-text", (data) => {
      data = data.message;
      console.log(data);

      if (clients[data.contactid]) {
        //Neu nguoi muon ket ban dang onl
        //gui du lieu den cac socket cua nguoi ban muon ket ban
        let response = {
          conversationId: data.conversationId,
          sendId: data.contactid,
          contactid: data.sendId,
          messageType: "text",
          content: data.content,
        };
        emitNotifyToArray(
          clients,
          data.contactid,
          io,
          "response-chat-text",
          response
        );
      }
    });

    socket.on("chat-text-admin", (data) => {
      let response = data;
      if (clients[data.userId]) {
        //Neu nguoi muon ket ban dang onl
        //gui du lieu den cac socket cua nguoi ban muon ket ban
        emitNotifyToArray(
          clients,
          data.userId,
          io,
          "response-chat-text-admin",
          response
        );
      }
    });
    socket.on("disconnect", () => {
      clients = removeSocketIdFromArray(
        clients,
        socket.request.user._id,
        socket
      );
    });
  });
};
module.exports = chatText;
