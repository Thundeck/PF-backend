const Event = require("../models/event.model");
const Complex = require("../models/complex.model");

//Trae los eventos de la db
const getAllEvents = async () => {
  try {
    const data = await Event.find();
    if (!data) throw new Error("No data");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Crea un evento
const createEvent = async (data) => {
  const { event_date, tittle, img, description, complexId } = data;
  if (!event_date) throw new Error("Event date is required");
  if (!tittle) throw new Error("Event title is required");
  if (!img) throw new Error("Event img is required");
  if (!description) throw new Error("Event description is required");
  try {
    const complex = await Complex.findById(complexId);
    const createdEvent = await Event.create(data);
    if (!createdEvent) throw new Error("Event not created");
    const addToComplex = await Complex.findByIdAndUpdate(complexId, {
      events: [...complex.events, createEvent._id],
    });
    if (!addToComplex) throw new Error("Event not added");
    return "Event created successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

//trae evento por id
const getEventID = async (_id) => {
  if (!id) throw new Error("Id not found");
  try {
    const data = await Event.findById(_id);

    if (!data) throw new Error("Event not found");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventID,
};
