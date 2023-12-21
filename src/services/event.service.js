const Event = require("../models/event.model");
const Complex = require("../models/complex.model");

//Trae los eventos de la db
const getAllEvents = async () => {
  try {
    const data = await Event.find();
    if (!data) throw "No data";
    return data;
  } catch (error) {
    throw error;
  }
};

//Crea un evento
const createEvent = async (data) => {
  const { event_date, tittle, img, description, complexId } = data;
  if (!event_date) throw "Event date is required";
  if (!tittle) throw "Event title is required";
  if (!img) throw "Event img is required";
  if (!description) throw "Event description is required";
  try {
    const complex = await Complex.findById({ _id: complexId });
    const createdEvent = await Event.create(data);
    if (!createdEvent) throw "Event not created";
    const addToComplex = await Complex.findOneAndUpdate(
      { _id: complexId },
      { events: [...complex.events, createEvent._id] }
    );
    if (!addToComplex) throw "Event not added";
    return "Event created successfully";
  } catch (error) {
    throw error;
  }
};

//trae evento por id
const getEventID = async (_id) => {
  if (!id) throw "Id not found";
  try {
    const data = await Event.findById(_id);

    if (!data) throw "Event not found";
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventID,
};
