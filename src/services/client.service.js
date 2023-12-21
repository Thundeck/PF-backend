const bcrypt = require("bcrypt");
const { Token } = require("../utils/generateId");
const { generateJWT, decodeJWT } = require("../utils/generateJWT");
const Client = require("../models/client.model");
const Complex = require("../models/complex.model");
const {
  sendMailValidation,
  sendMailPasswordRestore,
  sendMailBannedUser,
} = require("../libs/notifications");
require("dotenv").config();

const getAllClients = async () => {
  try {
    const data = await Client.find()
      .populate("favorites complexs reviews shifts")
      .exec();
    if (!data) throw "No data";
  } catch (error) {
    throw error;
  }
  return data;
};

//Crea un cliente
const createClient = async (data) => {
  console.log(data);
  const { email, password, name, repeatPassword } = data;

  const newUser = { ...data };
  if (!name) throw "Required data missing";
  if (password !== repeatPassword) throw "Passwords don't match";
  if (!password && !email && !name) throw "Required data";
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!emailRegex.test(email)) throw "Email isn't valid";
  if (email === process.env.ADMIN_MAIL) newUser.role = "admin";

  try {
    const token = Token();

    if (newUser.profile_img) {
      const cloudinaryLink = await cloudinary.uploader.upload(
        newUser.profile_img,
        {
          folder: "Booking",
        }
      );
      newUser.profile_img = cloudinaryLink.secure_url;
    }

    const clientFromDb = await Client.findOne({ email }).exec();
    if (clientFromDb) throw "Client is already registered";

    const create = await UserModel.create({ ...body, token });

    const notificationSend = await sendMailValidation(nickname, email, token);
    if (!notificationSend) throw "Notification not send";

    return create;
  } catch (error) {
    throw error;
  }
};

//trae cliente por id
const getClientID = async (_id) => {
  if (!_id) throw "cannot be searched without identification";

  try {
    const User = await Client.findById({ _id })
      .populate("favorites complexs reviews shifts")
      .exec();

    if (!User) throw "User not found";

    return User;
  } catch (error) {
    throw error;
  }
};

//Elimina el cliente
const deleteClient = async (_id) => {
  if (!_id) throw "cannot be deleted without identification";

  try {
    const deleted = await UserModel.findOneAndDelete({ _id });
    if (deleted) throw "client delete - ERROR";
    return "client deleted succesfully";
  } catch (error) {
    throw error;
  }
};

const authenticateClient = async (data) => {
  const { email, password } = data;
  try {
    const clientOnDb = await Client.findOne({ email });

    if (!clientOnDb) throw "User doesn't exist";

    if (!clientOnDb.isActive) throw "Your account is not confirmed";

    const passwordMatch = bcrypt.compare(password, clientOnDb?.password);

    if (passwordMatch) {
      return { ...clientOnDb, token: generateJWT(clientOnDb.id) };
    } else {
      throw "Password doesn't match";
    }
  } catch (error) {
    throw error;
  }
};

const confirmAccount = async (token) => {
  if (!token) throw "token is required";
  try {
    const dbClientToConfirm = await Client.findOne({ token });

    if (!dbClientToConfirm) {
      throw "Token is not valid or have been used already";
    }
    dbClientToConfirm.isActive = true;
    dbClientToConfirm.token = "";
    await dbClientToConfirm.save();
    return "User successfully confirmed";
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (email) => {
  try {
    const client = await Client.findOne({ email });
    if (!client) {
      throw "User doesn't exist";
    }
    client.token = generateId();
    await client.save();

    // ACA LE MANDAS UN EMAIL DE QUE SE OLVIDO PASSWORD. CON EMAIL, NAME Y TOKEN,
    const notificationSend = sendMailPasswordRestore(client.name, email, token);
    if (!notificationSend) throw "Error send mail";
    return "We sent you an email with instructions";
  } catch (error) {
    throw error;
  }
};

const checkToken = async (token) => {
  try {
    const dbClientFromToken = await Client.findOne({ token });
    if (dbClientFromToken) {
      return "Token valid and user exist";
    } else {
      throw "Token is not valid";
    }
  } catch (error) {
    throw error;
  }
};

const newPassword = async (token, password) => {
  try {
    const dbClientFromToken = await Client.findOne(
      { token },
      { token: "", password }
    );
    await dbClientFromToken.save();
    return "Password successfully modified";
  } catch (error) {
    throw error;
  }
};

const googleLogin = async (googleJWT) => {
  const { name, email, picture: profile_img, jti } = decodeJWT(googleJWT);
  try {
    const existingUser = await Client.findOne({ email });
    if (existingUser) {
      return { ...existingUser, token: generateJWT(existingUser.id) };
    } else {
      const rol = email === process.env.ADMIN_MAIL ? "admin" : "client";

      const newUser = await Client.create({
        name,
        email,
        profile_img,
        password: jti,
        rol,
        isActive: true,
      });
      const client = JSON.parse(JSON.stringify(newUser));
      return { ...client, token: generateJWT(client.id) };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllClients,
  createClient,
  getClientID,
  updateClient,
  deleteClient,
  authenticateClient,
  confirmAccount,
  forgotPassword,
  checkToken,
  newPassword,
  googleLogin,
};
