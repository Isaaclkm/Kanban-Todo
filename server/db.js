import mongoose from 'mongoose'

mongoose.set('strictQuery', false);

export async function connect(){
    try {
        mongoose.connect('mongodb://0.0.0.0:27017/mongodbgraphql', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         })
        console.log(">>>DB is connected");
    } catch(e) {
        console.log('Something goes wrong')
        console.log(e)
    }
}
