const { Event } = require('../models')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

class EventController {
  static async add(req, res, next) {
    try {
      const file = req.file.path;
      if (!file) {
        res.status(400).json({ message: 'No File is selected' });
      } else {
        const eventData = {
          nama_event: req.body.nama_event,
          gambar: req.file.path,
          jml_pos: req.body.jml_pos
        };
        const newEvent = await Event.create(eventData);
        const { id, nama_event } = newEvent;
        res.status(201).json({ id, nama_event });
      }
    }
    catch(err) {
      await unlinkAsync(req.file.path)
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

  static async findById(req, res, next) {
    const id = req.params.id
    try {
      const event = await Event.findOne({
        where: { id }
      });
      res.status(200).json(event);
    }
    catch(err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id
      const file = req.file.path;
      if (!file) {
        res.status(400).json({ message: 'No File is selected' });
      } else {
        const eventData = {
          nama_event: req.body.nama_event,
          gambar: req.file.path,
          jml_pos: req.body.jml_pos
        };
        await Event.update(eventData, {
          where: { id },
          returning: true
        })
        res.status(200).json('Event has been updated')
      }
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