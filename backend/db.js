const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
mongoose.set("strictQuery", false);
const mongoURI = 'mongodb://prateek:rj14200227@ac-rjo7le0-shard-00-00.kqysebe.mongodb.net:27017,ac-rjo7le0-shard-00-01.kqysebe.mongodb.net:27017,ac-rjo7le0-shard-00-02.kqysebe.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-10ggt7-shard-0&authSource=admin&retryWrites=true&w=majority' // Customer change url to your db you created in atlas
// mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority

const mongoDB=async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
   
        if (err) console.log("---",err)
        else {
            // var database =
            console.log("connected to mongo")
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err,catData){
                    if(err) console.log(err);
                    else{
                        global.food_items=data;
                        global.foodCategory=catData;
                        console.log(global.food_items);
                    }
                })
                
            
            })
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
}
module.exports=mongoDB;

