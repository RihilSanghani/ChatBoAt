import userModel from "../models/user.model.js";

export const getAllUsersForSideBar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const users = await userModel.find({ _id: { $ne: loggedInUser } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.log("error in getAllUsersForSideBar function: ", error);
        res.status(500).json({ message: error.message });
    }
}

export const getAllMessages = async (req, res) => {
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId },
            ],
        })
        res.status(200).json(messages);
    }
    catch(error){
        console.log("error in getAllMessages function: ", error);
        res.status(500).json({ message: error.message });
    }
}

export const sendMessages = async (req, res) => {
    try{
        const {id:receiverID} = req.params;
        const {text,image} = req.body;
        const senderID = req.user._id;

        let imageUrl
        if(image){
            const resposeImg = await cloudinary.uploader.upload(picture);
            imageUrl = resposeImg.secure_url
        }

        const newMessage = new Message({
            sender: senderID,
            receiver: receiverID,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //
        //    socket IO functinality here     
        //

        res.status(201).json(newMessage);
    }catch(error){
        console.log("error in sendMessages function: ", error);
        res.status(500).json({ message: error.message });
    }
}