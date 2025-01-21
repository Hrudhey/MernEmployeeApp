const mongoose= require('mongoose');
mongoose.connect(process.env.MongoDB_url).then(()=>{
    console.log('Connection Established to DB');
}).catch(()=>{
    console.log('Not connected');
})