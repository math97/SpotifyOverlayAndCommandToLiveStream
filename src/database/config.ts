import mongoose from 'mongoose';

  const mongoConnect = mongoose.connect(`${process.env.DATABASE_URI}`, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('connected to database');
  });

  export default mongoConnect;