import Message from "../models/message.js";

// crear mensaje
export const sendMessage = async (req, res) => {
  /*  const { text, idTeacher, idStudent } = req.body; */
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(200).json({ message });
  } catch {
    res.status(404).json({ message: "dont loading" });
  }
};

//Recoger todos los mensajes de un chat
export const getMessageByChat = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messagesSender = await Message.find({ sender, receiver });
    const messagesReceiver = await Message.find({ sender, receiver });
    res
      .status(200)
      .json({ sender: messagesSender, receiver: messagesReceiver });
  } catch {
    res.status(404).json({ message: error.message });
  }
};
