import mongoose from 'mongoose';

async function main() {
  await mongoose.connect(process.env.MONGODB_URI).then(
    ()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));;
}


export default main;