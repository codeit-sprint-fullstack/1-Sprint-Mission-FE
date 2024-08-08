import express from 'express';
import mongoose from 'mongoose';
import { DATABASE_URL } from './env.js';
import Data from './DataSchema.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: e.message });
      } else if (e.name === 'CastError') {
        res.status(404).send({ message: 'Cannot find given id.' });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

app.get(
  '/datas',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const data = await Data.find({}).skip(offset).limit(pageSize);
    res.status(200).send(data);
  })
);

app.get(
  '/datas/all',
  asyncHandler(async (req, res) => {
    const data = await Data.find({});
    res.status(200).send(data);
  })
);

app.post(
  '/datas',
  asyncHandler(async (req, res) => {
    const newData = await Data.create(req.body);
    res.status(201).send(newData);
  })
);

app.patch(
  '/datas/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const items = await Data.findById(id);
    if (items) {
      Object.keys(req.body).forEach((key) => {
        items[key] = req.body[key];
      });
      await items.save();
      res.send(items);
    } else {
      res.status(404).send({ message: 'Cannot find given id. ' });
    }
  })
);

app.delete(
  '/datas/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const items = await Data.findByIdAndDelete(id);
    if (items) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: 'Cannot find given id. ' });
    }
  })
);

app.listen(PORT, () => console.log(`PORT :` + PORT));

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log('Connected to DB'))
  .catch((e) => {
    console.log('err: ' + e);
  });
