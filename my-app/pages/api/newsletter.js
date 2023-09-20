import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  //check if the request is a post request
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    //input validation
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });//respond for invalid code
      return;
    }
    let client;

    try{
    const client = await connectDatabase();
    }catch(error){
    res.status(500).json({message:'connecting to the database failed!'});
    return;
  }

    try{
      await insertDocument(client, 'newsletter',{ email: userEmail });

      //close the open connection
      client.close();
    }catch (error){  
    res.status(500).json({message:'inserting data failed!'});
    return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
