
//
function handler(req, resp){
    //retrieve event ID from request query
    const eventId = req.query.eventId;
    //checking the request method if its a post
    if (req.method==='POST'){
        //add server-side validation
        const {email, name, text}=req.body;
        //validation
        if (
            !email.includes('a') || 
            !name || name.trim() === '' || 
            !text || text.trim() ==='')
            {
            resp.status(422).json({message:'input required'});
             return;
        }
        console.log(email, name, text);
        const newComment = {
            id:new Date().toISOString(),
            email,
            name,
            text,
        };

        console.log(newComment);

        resp.status(201).json({message: 'Added comment.', comment: newComment})
    }

    //check if request method is GET
    if (req.method==='GET'){
        const dummyList =[
            {id:'c1', name:'Max', text:'A first comment!'},
            {id:'c2', name:'Manuel', text:'A second comment!'},

        ];
         res.status(200).json({ comments: dummyList });
    }

}
export default handler