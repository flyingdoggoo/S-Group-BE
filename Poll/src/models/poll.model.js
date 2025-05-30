import mongoose from "mongoose";

const pollSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        options: [{
            text: {
                type: String,
                trim: true,
                required: true
            },
            votes: {
                type: Number,
                default: 0
            },
            userVote: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PollUser'
            }]
        }],
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PollUser',
            required: true
        },
        votesCount: {
            type: Number
        },
        isLocked: {
            type: Boolean,
            default: false
        }
    }
)

const Polls = mongoose.model("Polls", pollSchema);

export default Polls