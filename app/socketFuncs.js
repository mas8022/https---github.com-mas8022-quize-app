import connectToDb from "../configs/db.js";
import messageModel from "../models/message.js";
import userModel from "../models/user.js";

connectToDb();

export default async function socketFuncs(io, socket) {
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

    const messages = await messageModel.find(
      {
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      },
      "-__v -updatedAt"
    );

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

  socket.on("startGame", async ({ myId }) => {
    try {
      await userModel.findOneAndUpdate({ _id: myId }, { playStatus: "wait" });

      const findOpponent = async () => {
        return await userModel.findOne(
          {
            playStatus: "wait",
            _id: { $ne: myId },
          },
          "socketId"
        );
      };

      const intervalId = setInterval(async () => {
        const findPlayer = await findOpponent();

        if (findPlayer) {
          clearInterval(intervalId);

          socket.emit("game-found", { myId, youId: findPlayer._id });
          socket
            .to(findPlayer.socketId)
            .emit("game-found", { myId, youId: findPlayer._id });

          await userModel.findOneAndUpdate(
            { _id: myId },
            { playStatus: "playing" }
          );
          await userModel.findOneAndUpdate(
            { _id: findPlayer._id },
            { playStatus: "playing" }
          );
        }
      }, 2000);
    } catch (error) {
      console.error("خطا در پیدا کردن بازیکن:", error);
    }
  });
}
