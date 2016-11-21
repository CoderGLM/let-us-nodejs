/*
 *
 *  mongodb的安装与启动：http://yijiebuyi.com/blog/b6a3f4a726b9c0454e28156dcc96c342.html
 *
 *
 *  shell: https://docs.mongodb.com/manual/mongo/#working-with-the-mongo-shell
 *
 *  nodejs使用该数据库：https://docs.mongodb.com/getting-started/node/introduction/
 *
 */

import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/test'


let insertDocument = function (db, callback) {
   db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

let findRestaurants = function (db, callback) {
  let cursor = db.collection('restaurants').find();
  cursor.each((err, doc) => {
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
}

MongoClient.connect(url, function(err, db) {
  insertDocument(db, function() {
    findRestaurants(db, () => {
      console.log('没拿到数据')
    });
    db.close();
  });
});


