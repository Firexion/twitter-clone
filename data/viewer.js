import mongoose from 'mongoose';

import {User} from './user'

const ViewerSchema = new mongoose.Schema({

});

const Viewer = mongoose.model('Viewer', ViewerSchema);

export async function getViewer() {
  const viewers = await Viewer.find({});
  
  if (viewers.length == 0) {
    return await Viewer.create({});
  }

  return viewers[0];
}