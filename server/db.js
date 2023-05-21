import mongoose from 'mongoose';
const dbPassword = process.env.DB_PASSWORD;

mongoose.set('strictQuery', false);

export async function connect() {
  try {
    await mongoose.connect(`mongodb+srv://Isaaclkm:${dbPassword}@cluster0.sp9rcoe.mongodb.net/<database>?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(">>>DB is connected");
  } catch (e) {
    console.log('Something went wrong');
    console.log(e);
  }
}