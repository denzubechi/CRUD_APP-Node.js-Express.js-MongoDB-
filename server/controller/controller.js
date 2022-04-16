const Userdb = require("../model/model")

//create and save new user
exports.create= (req,res)=>{
    //Validate the request
    if(!req.body){
        res.status(400).send({message:"Content Cannot be empty"})
    }
    //new user
    const user = Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    //Save user in datatbase in mongodb
    user
    .save(user)
    .then(data=>{
        res.redirect("/add-user")
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Some error occured while creating operations"
        })
    })

}
//Retrieve and Return all Users/single Use
exports.find = (req,res)=>{   

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: `Could not find data with id ${id}`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Error Occured while retreiving user with id:" + id
            })
        })

    }else{
        
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Error occured while retrieving user"})
    })
    }
}

//Update a new identified user by userr id
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update cannot be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot update user ${id}. Maybe User not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update user Information"})
    })    
}
//Delete a specified user id in the user request
exports.delete = (req,res)=>{
    const id= req.params.id

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot delete with id ${id}. Maybe id is wrong`})
        }
        else{
            res.send({
                message:"User was deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "could not be deleted with user id"+ id
        })
    })
}