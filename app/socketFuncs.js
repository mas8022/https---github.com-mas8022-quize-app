import connectToDb from "../configs/db.js";
import messageModel from "../models/message.js";

connectToDb();

export default async function socketFuncs(io, socket) {
  chat(io, socket);
}

function chat(io, socket) {
  socket.on("sendMessage", async ({ sender, receiver, message }) => {
    // Zakhire kardane payam dar database
    await messageModel.create({ sender, receiver, message });

    // Peyda kardan hameye payam-haye beyne do fard
    const messages = await messageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });

    // Peygham ro be room haye marbut ferestadan
    io.to(`${sender}-${receiver}`)
      .to(`${receiver}-${sender}`)
      .emit("allMessages", messages);
  });

  socket.on("getMessages", async ({ sender, receiver }) => {
    socket.join(`${sender}-${receiver}`);
    socket.join(`${receiver}-${sender}`);

    const messages = await messageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    },"-__v -updatedAt")

    io.to(`${sender}-${receiver}`)
      .to(`${receiver}-${sender}`)
      .emit("allMessages", messages);
  });

  socket.on("onlineStatus", ({ isOnlineUser }) => {
    socket.broadcast
      .to(`${sender}-${receiver}`)
      .to(`${receiver}-${sender}`)
      .emit("onlineStatus", isOnlineUser);
  });
}
