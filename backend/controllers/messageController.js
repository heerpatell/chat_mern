const Message = require("../model/msgModel");

module.exports.addmsg = async(req,res,next) => {
    try{
        var from = req.body.currentUserId; 
        var to = req.body.currentChatId; 
        var msg = req.body.msg;

        console.log(from,to,msg)
        const data = await Message.create({
            message:{text:msg},
            users: [from,to],
            // sender: from
        })
        console.log(data)
        if(data) 
            return res.json({msg:'msg added successfully'})
        return res.json({msg:'Failed to add msg'})

    }catch(e){
        next(e)
    }
}

module.exports.getmsg = async(req,res,next) => {
    try{
        var from = req.body.currentUserId; 
        var to = req.body.currentChatId; 

        const messages = await Message.find({
            users:{
                $all: [from,to],
            },
        })
        .sort({updatedAt:1}) //sort document(row) in descending order according to date
        
        console.log(messages)
        const projectMsgs = messages.map((msg)=>{
            return{
                // fromSelf: msg.users[0].toString() === from,
                fromSelf: msg.users[0].toString() ,
                message: msg.message.text
            }
        })
        res.json(projectMsgs)
    }catch(ex){
        next(ex)
    }
}