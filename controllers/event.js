const { Event } = require('../models')

class EventController {
  static async add(req, res, next) {
    try {
      const eventData = {
        nama_event: req.body.nama_event,
        gambar: req.body.gambar,
        jml_pos: req.body.jml_pos
      };
      const newEvent = await Event.create(eventData);
      const { id, nama_event } = newEvent;
      res.status(201).json({ id, nama_event });
    }
    catch(err) {
      next(err)
    };
  }

  static async findAll(req, res, next) {
    try {
      const events = await Event.findAll({
        order: [['id', 'asc']]
      });
      res.status(200).json(events);
    } catch (err) {
      next(err)
    };
  }

  static async update(req, res, next) {
    const id = req.params.id
    try {
      const eventData = {
        nama_event: req.body.nama_event,
        gambar: req.body.gambar,
        jml_pos: req.body.jml_pos
      };
      const event = await Event.update(eventData, {
        where: { id },
        returning: true
      })
      res.status(200).json(event[1])
  }
    catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      const event = await Event.destroy({
        where: { id }
      });
      res.status(200).json({ message: `Event is Deleted` })
    } catch (err) {
        next(err)
    };
  }
};

module.exports = EventController;