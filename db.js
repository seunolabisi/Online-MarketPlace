
const mongoose = require("mongoose")

mongoose.connect("mongodb://seunolabisi131_db_user:kHksIgepnJg2uCKU@ac-avdg4rf-shard-00-00.j1yplq0.mongodb.net:27017,ac-avdg4rf-shard-00-01.j1yplq0.mongodb.net:27017,ac-avdg4rf-shard-00-02.j1yplq0.mongodb.net:27017/?ssl=true&replicaSet=atlas-w12mlz-shard-0&authSource=admin").then(()=>{console.log("Database is established")}).catch((err)=>{console.log("Unable to connect "+err)})   
 
  