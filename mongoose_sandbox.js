'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');

var db = mongoose.connection;

db.on('error', () => {
  console.err('connection error:', err);
});

db.once('open', () => {
  console.log('db connection successful');
  // All database communciation goes here

  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type: {type: String, default: "goldfish"},
    size: String,
    color: {type: String, default: "golden"},
    mass: {type: Number, default: 0.007},
    name: {type: String, default: "Angela"}
  });

  AnimalSchema.pre("save", function(next) {
    if(this.mass >= 100) {
      this.size = 'big';
    } else if (this.mass >= 5 && this.mass < 100) {
      this.size = "medium";
    } else {
      this.size = "small";
    }
    next();
  });


  var Animal = mongoose.model('Animal', AnimalSchema);

  var elephant = new Animal({
    type: 'elephant',
    color: 'gray',
    mass: 6000,
    name: 'Lawrence'
  });

  var animal = new Animal({}); //Goldfish

  var whale = new Animal({
    type: 'whale',
    mass: 190500,
    name: 'Fig'
  });

  var animalData = [
    {
      type: "mouse",
      color: "gray",
      mass: 0.035,
      name: "Marvin"
    },
    {
      type: "nutria",
      color: "brown",
      mass: 6.35,
      name: "Gretchin"
    },
    {
      type: "wolf",
      color: "gray",
      mass: 6.35,
      name: "Iris"
    },
    elephant,
    animal,
    whale
  ];

  Animal.remove({}, (err) =>{
    if (err) console.error(err);
    Animal.create(animalData, (err, animals) => {
      if (err) console.error(err);
      Animal.find({}, (err, animals) =>{
        animals.forEach( (animal) => {
          console.log(animal.name + ' the ' + animal.color + ' ' + animal.type + " is a " + animal.size + "-sized animal.");
        });
        db.close( () => {
          console.log('db connection closed');
        });
      });
    });
  });



});
