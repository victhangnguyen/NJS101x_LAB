//! imp library
import Logging from '../library/Logging';

import * as mongoDB from 'mongodb';

const usernameMongoDB = 'njs101x';
const passwordMongoDB = 'njs101x';

let _db: mongoDB.Db;

const MongoClient: mongoDB.MongoClient = new mongoDB.MongoClient(
  `mongodb+srv://${usernameMongoDB}:${passwordMongoDB}@cluster0.nbojriq.mongodb.net/?retryWrites=true&w=majority`
);

export const mongoConnect = (callbackFn: () => void) => {
  MongoClient.connect()
    .then((client) => {
      Logging.info('Connected!');
      _db = client.db(); //! storing a Connection to our database in _db, and if we leaves it,
      callbackFn();
    })
    .catch((err) => {
      throw err;
    });
};
//! This method will return access to that Connected-Database if _db exist.
export const getDB = () => { 
  if (_db) {
    //! if _db is set
    return _db;
  }
  //! else, throw error
  throw 'No database found'
};
