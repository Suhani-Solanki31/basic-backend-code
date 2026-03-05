import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new Schema({

    videoFile:{
        type:String,  //cloudinary url
        required:true,
    },

    thumbnail:{
        type:String,  //cloudinary url
        required:true,
    },

    title:{
        type:String,
        required:[true,"Title is required"],
    },
    description:{
        type:String,
        required:[true,"Description is required"],
    },
    duration:{
        type:Number,   // from cloud
        required:[true,"duration is required"],
    },
    views:{
        type:Number,
        default:0,
        required:[true,"Thumbnail is required"],
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})


VideoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",VideoSchema);