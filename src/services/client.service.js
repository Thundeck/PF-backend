const bcrypt = require("bcrypt");
const { Token } = require("../utils/generateId");
const { generateJWT, decodeJWT } = require("../utils/generateJWT");
const cloudinary = require("../utils/cluodinary");
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
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Crea un cliente
const createClient = async (data) => {
  const { email, password, name, repeatPassword } = data;

  const newUser = { ...data };
  if (!name) throw new Error("Required data missing");
  if (password !== repeatPassword) throw new Error("Passwords don't match");
  if (!password && !email && !name) throw new Error("Required data");
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!emailRegex.test(email)) throw new Error("Email isn't valid");
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
      newUser.token = token;
    }

    const clientFromDb = await Client.findOne({ email }).exec();
    if (clientFromDb) throw new Error("Client is already registered");

    const create = await Client.create(newUser);

    const notificationSend = await sendMailValidation(name, email, token);
    if (!notificationSend) throw new Error("Notification not send");

    return {
      msg: "User sucessfully created",
      user: {
        _id: create._id,
        name: create.name,
        profile_img: create.profile_img,
        email: create.email,
        token: create.token,
        rol: create.rol,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

//trae cliente por id
const getClientID = async (_id) => {
  if (!_id) throw new Error("cannot be searched without identification");

  try {
    const User = await Client.findById(_id)
      .populate("favorites complexs reviews shifts")
      .exec();

    if (!User) throw new Error("User not found");

    return User;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Elimina el cliente
const deleteClient = async (_id) => {
  if (!_id) throw new Error("cannot be deleted without identification");

  try {
    const deleted = await Client.findOneAndDelete({ _id });
    if (deleted) throw new Error("client delete - ERROR");
    return "client deleted succesfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

const authenticateClient = async (data) => {
  const { email, password } = data;
  try {
    const clientOnDb = await Client.findOne({ email });

    if (!clientOnDb) throw new Error("User doesn't exist");

    if (!clientOnDb.isActive) throw new Error("Your account is not confirmed");

    const passwordMatch = bcrypt.compare(password, clientOnDb?.password);

    if (passwordMatch) {
      return { ...clientOnDb._doc, token: generateJWT(clientOnDb._id) };
    } else {
      throw new Error("Password doesn't match");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmAccount = async (token) => {
  if (!token) throw new Error("token is required");
  try {
    const dbClientToConfirm = await Client.findOne({ token });

    if (!dbClientToConfirm) {
      throw new Error("Token is not valid or have been used already");
    }
    const updatedClient = await Client.findByIdAndUpdate(
      dbClientToConfirm._id,
      {
        token: "",
        isActive: true,
      }
    );
    if (!updatedClient) throw new Error("ERRROR - Fail to update client");
    return "User successfully confirmed";
  } catch (error) {
    throw new Error(error.message);
  }
};

const forgotPassword = async (email) => {
  try {
    const client = await Client.findOne({ email });
    if (!client) {
      throw new Error("User doesn't exist");
    }
    client.token = generateId();
    await client.save();

    // ACA LE MANDAS UN EMAIL DE QUE SE OLVIDO PASSWORD. CON EMAIL, NAME Y TOKEN,
    const notificationSend = sendMailPasswordRestore(client.name, email, token);
    if (!notificationSend) throw new Error("Error send mail");
    return "We sent you an email with instructions";
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkToken = async (token) => {
  try {
    const dbClientFromToken = await Client.findOne({ token });
    if (dbClientFromToken) {
      return "Token valid and user exist";
    } else {
      throw new Error("Token is not valid");
    }
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};

const googleLogin = async (googleJWT) => {
  const { name, email, picture: profile_img, jti } = decodeJWT(googleJWT);
  try {
    const existingUser = await Client.findOne({ email });
    if (existingUser) {
      return { ...existingUser, token: generateJWT(existingUser._id) };
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

      return { ...newUser._doc, token: generateJWT(newUser._id) };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateClient = async (id, data) => {
  const updateUser = Object.keys(data)
    .filter((key) => data[key])
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: data[key],
      };
    }, {});

  try {
    if (!id) throw new Error("Client ID is required");
    const client = await Client.findByIdAndUpdate(id, updateUser);
    if (!client) throw new Error("ERROR - Client not updated");

    return client;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addFavorite = async (client, complex) => {
  if (!client) throw new Error("Client ID is required");
  if (!complex) throw new Error("Complex ID is required");
  try {
    const findClient = await Client.findById(client);
    if (!findClient) throw new Error("ERROR - Client not found");

    const findComplex = await Complex.findById(complex);
    if (!findComplex) throw new Error("ERROR - Complex not found");

    const updateClient = await Client.findByIdAndUpdate(
      findClient._id,
      {
        favorites: [...new Set([...findClient.favorites, complex])],
      },
      { new: true }
    ).populate({ path: "favorites", populate: "services typeCourts" });
    if (!updateClient) throw new Error("ERROR - Client not updated");

    return updateClient.favorites;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteFavorite = async (client, complex) => {
  if (!client) throw new Error("Client ID is required");
  if (!complex) throw new Error("Complex ID is required");
  try {
    const findClient = await Client.findById(client).populate("favorites");
    if (!findClient) throw new Error("ERROR - Client not updated");

    const findComplex = await Complex.findById(complex);
    if (!findComplex) throw new Error("ERROR - Complex not updated");

    const newArr = findClient.favorites.filter(
      (e) => e._id.toString() !== complex
    );

    const updateClient = await Client.findByIdAndUpdate(
      findClient._id,
      {
        favorites: newArr,
      },
      { new: true }
    ).populate({ path: "favorites", populate: "services typeCourts" });
    if (!updateClient) throw new Error("ERROR - Client not updated");

    return updateClient.favorites;
  } catch (error) {
    throw new Error(error.message);
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
  addFavorite,
  deleteFavorite,
};
