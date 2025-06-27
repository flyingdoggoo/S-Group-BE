import User from "../models/user.model.js"
import Polls from "../models/poll.model.js"
class UserService{
    constructor(){
        this.user = User
        this.poll = Polls
    }
    async Vote(idPoll, idOption, idVoter)
    {
        try
        {
            //
            const votePoll = await this.poll.findOne({_id: idPoll})
            if(!votePoll)
                throw new Error("Poll được vote không tồn tại")
            if(votePoll.isLocked)
                throw new Error("Poll đã bị khóa vote")
            const option = votePoll.options.id(idOption)
            if(!option)
                throw new Error("Option không tồn tại");
    
            if (option.userVote.includes(idVoter)) 
                throw new Error("User đã vote rồi");
            
            option.userVote.push(idVoter)
            option.votes += 1
            votePoll.votesCount += 1
    
            const saved = await votePoll.save()
            return saved
        }
        catch(err)
        {
            throw new Error("Lỗi khi vote: " + err.message)
        }
    }
    async UnVote(idPoll, idOption, idVoter)
    {
        try
        {
            const votePoll = await this.poll.findOne({_id: idPoll})
            if(!votePoll)
                throw new Error("Poll được vote không tồn tại")
            if(votePoll.isLocked)
                throw new Error("Poll đã bị khóa vote")
            const option = votePoll.options.id(idOption)
            if(!option)
                throw new Error("Option không tồn tại");
    
            if (!option.userVote.includes(idVoter)) {
                throw new Error("User chưa vote option này");
            }
    
            option.userVote.pull(idVoter)
            option.votes -= 1
            votePoll.votesCount -= 1
    
            const saved = await votePoll.save()
            return saved
        }
        catch(err)
        {
            throw new Error("Lỗi khi unvote: " + err.message)
        }
    }
}

export default new UserService()