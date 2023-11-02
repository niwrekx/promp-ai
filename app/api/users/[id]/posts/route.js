import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//this was a POST before LOL
export const GET = async (request,{params}) => {
    // const {userId, prompt, tag} = await request.json();

    try{
        // Connect to DB
        await connectToDB();
         // Find field in mongodb
        const prompts = await Prompt.find({ creator: params.id }).populate("creator");
        
        return new Response(JSON.stringify(prompts), {status:200})
    }catch(error){
        return new Response ("Failed to fetch prompts created by user", {status:500});
    }
}