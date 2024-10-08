const mongoose=require('mongoose')

const connectionRequestSchema=mongoose.Schema({
    fromId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"user"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"user"
    },
    status:{
        type:String,
        require:true,
        enum:{
            values:['interested','ignored','accepted','rejected'],
            message:'{value} status is not valid '
        }
    }
},{timestamps:true})

connectionRequestSchema.pre("save",function(next){
    if(this.fromId.equals(this.toUserId)){
        throw new Error('from and to cant be same')
    }
    next()
})

const connectionModel=mongoose.model("connectionRequest",connectionRequestSchema)

module.exports=connectionModel