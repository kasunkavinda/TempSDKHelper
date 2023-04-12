class VoteContext{
    hpContext = null;
    voteCollection = {};
    
    constructor(hpContext){
        this.hpContext = hpContext
    }

    async send(electionType, message){

        const object = {type: electionType, message: message}
        const res = new Promise(async(resolve, reject) => {
            
            // message body should be 
            await this.hpContext.unl.send(JSON.stringify(object));
        })
    }

    async feedVote(sender, message){
        const jsonMsg = JSON.parse(message);
        const electionType = jsonMsg.type;
        const vote = {message: jsonMsg.message, sender: sender.pubkey};


        if(this.voteCollection[electionType]){
            this.voteCollection[electionType].push(vote);
        }
        else{
            this.voteCollection[electionType] = [vote]
        }
    }
}