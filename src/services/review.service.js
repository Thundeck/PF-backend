const Client = require("../models/client.model");
const Complex = require("../models/complex.model");
const Review = require("../models/review.model");

const getReviewComplex = async (idComplex) => {
  try {
    const review = await Review.findById(_id).populate("complexId clientId");
    if (!review) throw new Error("Not found");

    return review;
  } catch (error) {
    throw new Error(error.message);
  }
};

const allReview = async () => {
  try {
    const review = await Review.find();

    if (!review) throw new Error("Not found");
    return review;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getReviewID = async (_id) => {
  try {
    const review = await Review.findById(_id).populate("complexId clientId");

    if (!review) throw new Error("Not found");
    return review;
  } catch (error) {}
  throw new Error(error.message);
};

const deleteReview = async (_id) => {
  try {
    const review = await Review.findById(_id).populate("complex client");
    if (!review) throw new Error("Review not found");
    const client = await Client.findById(review.client._id);
    if (!review) throw new Error("Client not found");
    const complex = await Complex.findById(review.complex._id);
    if (!review) throw new Error("Complex not found");

    const deleteFromClient = await Client.findByIdAndUpdate(client._id, {
      reviews: client.filter((e) => e !== _id),
    });
    if (!deleteFromClient) throw new Error("Client not updated");

    const deleteFromComplex = await Complex.findByIdAndUpdate(complex._id, {
      reviews: complex.filter((e) => e !== _id),
    });
    if (!deleteFromComplex) throw new Error("Complex not updated");

    const deletedReview = await Review.findByIdAndUpdate(_id);
    if (!deletedReview) throw new Error("Review not deleted");

    return "Review deleted succesfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateReview = async ({ id, data }) => {
  if (id) throw new Error("id is required");
  try {
    const result = await Review.findByIdAndUpdate(id, data);
    if (!result) throw new Error("Error to update review");
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createReview = async (review) => {
  const { rating, comment, complex, client } = review;

  if (!rating) throw new Error("Rating is required");
  if (!comment) throw new Error("Comment is required");
  if (!complex) throw new Error("Complex ID is required");
  if (!client) throw new Error("Client ID is required");

  try {
    const complexFind = await Complex.findById(complex).populate("reviews");
    if (!complexFind) throw new Error("Complex not found");
    const clientFind = await Client.findById(client);
    if (!clientFind) throw new Error("Client not found");

    const reviewCreated = await Review.create(review);
    if (!reviewCreated) throw new Error("Review not created");

    const sumReviews = 0;

    complexFind.reviews.forEach((review) => {
      sumReviews += review.rating;
    });

    const like =
      (sumReviews + reviewCreated.rating) / complexFind.reviews.length + 1;

    const addToComplex = await Complex.findByIdAndUpdate(complex, {
      reviews: [...complexFind.reviews, reviewCreated._id],
      like,
    });
    if (!addToComplex) throw new Error("Complex not updated");
    const addToClient = await Client.findByIdAndUpdate(client, {
      reviews: [...clientFind.reviews, reviewCreated._id],
    });
    if (!addToClient) throw new Error("Client not updated");

    return "Review succesfully created";
  } catch (error) {
    throw new Error(error.message);
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
