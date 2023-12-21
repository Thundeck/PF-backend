const Client = require("../models/client.model");
const Complex = require("../models/complex.model");
const Review = require("../models/review.model");

const getReviewComplex = async (idComplex) => {
  try {
    const review = await Review.find({ _id: idComplex }).populate(
      "complexId clientId"
    );
    if (!review) throw "Not found";

    return review;
  } catch (error) {
    throw error;
  }
};

const allReview = async () => {
  try {
    const review = await Review.find();

    if (!review) throw "Not found";
    return review;
  } catch (error) {
    throw error;
  }
};

const getReviewID = async (_id) => {
  try {
    const review = await Review.findById({ _id }).populate(
      "complexId clientId"
    );

    if (!review) throw "Not found";
    return review;
  } catch (error) {}
  throw error;
};

const deleteReview = async (_id) => {
  try {
    const review = await Review.findById({ _id }).populate("complex client");
    if (!review) throw "Review not found";
    const client = await Client.findById({ _id: review.client._id });
    if (!review) throw "Client not found";
    const complex = await Complex.findById({ _id: review.complex._id });
    if (!review) throw "Complex not found";

    const deleteFromClient = await Client.findOneAndUpdate(
      { _id: client._id },
      { reviews: client.filter((e) => e !== _id) }
    );
    if (!deleteFromClient) throw "Client not updated";

    const deleteFromComplex = await Complex.findOneAndUpdate(
      { _id: complex._id },
      { reviews: complex.filter((e) => e !== _id) }
    );
    if (!deleteFromComplex) throw "Complex not updated";

    const deletedReview = await Review.findOneAndDelete({ _id });
    if (!deletedReview) throw "Review not deleted";

    return "Review deleted succesfully";
  } catch (error) {
    throw error;
  }
};

const updateReview = async ({ id, comment, rating }) => {
  const result = await Review.update(
    { rating: rating, comment: comment },
    { where: { id: id } }
  );
  if (!result) throw "Error update review";
  return result;
};

const createReview = async (review) => {
  const { rating, comment, complex, client } = review;

  if (!rating) throw "Rating is required";
  if (!comment) throw "Comment is required";
  if (!complex) throw "Complex ID is required";
  if (!client) throw "Client ID is required";

  try {
    const complexFind = Complex.findById({ _id: complex });
    if (!complexFind) "Complex not found";
    const clientFind = Client.findById({ _id: client });
    if (!clientFind) "Client not found";

    const reviewCreated = await Review.create(review);
    if (!reviewCreated) "Review not created";

    const addToComplex = Complex.findOneAndUpdate(
      { _id: complex },
      { reviews: [...complexFind.reviews, reviewCreated._id] }
    );
    if (!addToComplex) "Complex not updated";
    const addToClient = Client.findOneAndUpdate(
      { _id: client },
      { reviews: [...clientFind.reviews, reviewCreated._id] }
    );
    if (!addToClient) "Client not updated";

    return "Review succesfully created";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getReviewComplex,
  allReview,
  getReviewID,
  deleteReview,
  updateReview,
  createReview,
};
