const HotPocket = require('hotpocket-nodejs-contract');

async function contract(ctx) {
    voteContext = new VoteContext(ctx);
    const userHandlers = [];

    for (const user of ctx.users.list()) {

        userHandlers.push(new Promise(async (resolve) => {

            for (const input of user.inputs) {

                const buf = await ctx.users.read(input);
                const msg = buf.toString();



                ctx.unl.onMessage((node, msg) => {
                    voteContext.feedVote(node, msg);
                    console.log(msg + " from " + node.publicKey);
                })


                const output = (msg == "ts") ? fs.readFileSync("exects.txt").toString() : ("Echoing: " + msg);
                await user.send(output);

            }

            resolve();
        }));
    }

    await Promise.all(userHandlers);


}



const hpc = new HotPocket.Contract();
hpc.init(contract);