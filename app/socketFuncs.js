import connectToDb from "../configs/db.js";
import messageModel from "../models/message.js";
import userModel from "../models/user.js";

connectToDb();

export default async function socketFuncs(io, socket) {
  socket.on("sendMessage", async ({ sender, receiver, message }) => {
    await messageModel.create({ sender, receiver, message });

    const messages = await messageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });

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

  socket.on("startGame", async ({ myId }) => {
    try {
      await userModel.findOneAndUpdate({ _id: myId }, { playStatus: "wait" });
      const myUserNameAndId = await userModel.findOne(
        { _id: myId },
        "userName"
      );
      const myUserName = myUserNameAndId.userName;

      const intervalId = setInterval(async () => {
        const findPlayer = await userModel.findOne(
          {
            playStatus: "wait",
            _id: { $ne: myId },
          },
          "socketId userName"
        );

        if (findPlayer) {
          socket.emit("game-found", {
            playerOneId: findPlayer._id,
            playerTwoId: myId,
          });

          clearInterval(intervalId);

          await userModel.findOneAndUpdate(
            { _id: myId },
            { playStatus: "wait" }
          );
          await userModel.findOneAndUpdate(
            { _id: findPlayer._id },
            { playStatus: "wait" }
          );
        }
      }, 1000);
    } catch (error) {}
  });

  socket.on("finish-game", async ({ playerOneId, playerTwoId, myRealId }) => {
    const myData = await userModel.findOne(
      { _id: myRealId },
      "temporaryScore socketId userName"
    );

    const myScore = myData.temporaryScore;

    const playerData = await userModel.findOne(
      { _id: playerOneId },
      "temporaryScore socketId"
    );
    const playerScore = playerData.temporaryScore;

    if (myScore > playerScore) {
      await userModel.findOneAndUpdate(
        { _id: myRealId },
        { $inc: { score: myScore } }
      );
      socket.emit("result-game", true);
    } else {
      socket.emit("result-game", false);
    }

    await userModel.findOneAndUpdate(
      { _id: playerOneId },
      { playStatus: "notPlay" }
    );
    await userModel.findOneAndUpdate(
      { _id: playerTwoId },
      { playStatus: "notPlay" }
    );
  });

  socket.on("onlineStatus", async ({ isOnlineUser, receiver, sender }) => {
    const userData = await userModel.findOne(
      { userName: receiver },
      "socketId"
    );
    const userSocketId = userData.socketId;
    io.to(userSocketId).emit("onlineStatus", { isOnlineUser, sender });
  });
}
