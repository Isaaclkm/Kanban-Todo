import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export async function connect() {
  try {
    await mongoose.connect('mongodb+srv://Isaaclkm:KVg1HCky3dSPwZAD@cluster0.sp9rcoe.mongodb.net/<database>?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(">>>DB is connected");
  } catch (e) {
    console.log('Something went wrong');
    console.log(e);
  }
}