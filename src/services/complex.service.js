const Complex = require("../models/complex.model");
const Client = require("../models/client.model");
const { sendMailBannedComplex } = require("../libs/notifications");
const axios = require("axios");
const cloudinary = require("../utils/cluodinary");

const getAllComplexCity = async ({ city, province }) => {
  try {
    if (!province) throw new Error("Province name is required");
    if (!city) throw new Error("City name is required");
    const data = await Complex.find({ active: true, city, province }).populate(
      "services clients events typeCourts"
    );

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllComplexs = async () => {
  try {
    const data = await Complex.find();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMostLiked = async () => {
  try {
    const data = await Complex.find()
      .sort({ like: -1 })
      .limit(5)
      .populate("services typeCourts");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserComplex = async (id) => {
  try {
    if (!id) throw new Error("user ID is required");
    const client = await Client.findById(id).populate({
      path: "complexs",
      populate: { path: "courts", populate: "shifts" },
    });
    return client.complexs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createComplex = async (data) => {
  const { name, logo, idUser, imgs } = data;
  const newComplex = { ...data };
  try {
    const client = await Client.findById(idUser);
    if (!client) throw new Error("User not exist");
    newComplex.clientId = idUser;

    if (client.complexs.length < 1) {
      const updateRol = await Client.findByIdAndUpdate(client._id, {
        rol: "owner",
      });
      if (!updateRol) throw new Error("Fail to update user rol");
    }

    const imageUpload = await cloudinary.uploader.upload(logo, {
      folder: "BooKing",
    });

    const complexImgs = await Promise.all(
      imgs.map((e) =>
        cloudinary.uploader
          .upload(e, {
            folder: "BooKing",
          })
          .then((imgLink) => imgLink.secure_url)
      )
    );

    if (!imageUpload) throw new Error("Error to upload logo");
    newComplex.logo = imageUpload.secure_url;

    if (complexImgs.length < 1) throw new Error("Error to upload complex imgs");
    newComplex.imgs = complexImgs;

    if (!name) throw new Error("name is required");

    const createdComplex = await Complex.create(newComplex);
    if (!createdComplex) throw new Error("ERRROR - Complex not created");

    const addToClient = await Client.findByIdAndUpdate(idUser, {
      complexs: [...client.complexs, createdComplex._id],
    });
    if (!addToClient) throw new Error("ERRROR - Complex not added");

    return "complex succesfully created";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getComplexID = async (id) => {
  if (!id) throw new Error("no ID especified");
  try {
    const data = await Complex.findById(id)
      .populate({
        path: "courts",
        populate: {
          path: "typeCourt",
        },
      })
      .populate({
        path: "reviews",
        populate: {
          path: "client",
        },
      })
      .populate("services clients events");

    if (!data) throw new Error("No found");

    const province = await axios.get(
      `https://apis.datos.gob.ar/georef/api/provincias?id=${data.province}`
    );
    const city = await axios.get(
      `https://apis.datos.gob.ar/georef/api/localidades-censales?id=${data.city}&campos=nombre`
    );

    return {
      ...data._doc,
      city: city.data.localidades_censales[0].nombre,
      province: province.data.provincias[0].nombre,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateComplex = async (_id, data) => {
  try {
    const complex = await Complex.findByIdAndUpdate(_id, { ...data });
    if (!complex) throw new Error("ERROR - the complex has not been updated");
    return "complex update succesfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteComplex = async (_id) => {
  try {
    const complex = await Complex.findByIdAndUpdate(_id, { deleted: true });
    if (!complex) throw new Error("ERROR - the complex has not been updated");
    return "complex deleted succesfully";
  } catch (error) {}
};

module.exports = {
  createComplex,
  getAllComplexs,
  getComplexID,
  updateComplex,
  deleteComplex,
  getUserComplex,
  getAllComplexCity,
  getMostLiked,
};
