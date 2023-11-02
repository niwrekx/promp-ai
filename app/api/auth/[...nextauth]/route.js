// import NextAuth from "next-auth/next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,            
        })
    ],
    callbacks:{
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({ 
                email: session.user.email 
            });
            session.user.id = sessionUser._id.toString();
      
            return session;
        },
        // async signIn({account, profile, user, credentials})
        async signIn({profile}) {
            try{
                await connectToDB();
              
                //1-check when user exist
                const userExists = await User.findOne({
                    email: profile.email
                });

                //2-if not, create a new user
                //note .replaceAll was .replace before
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        // username: profile.name.replace(/\s/g, "").toLowerCase(),
                        image: profile.picture,                
                    });
                }
                return true;
                } catch (error) {
                    console.log("Error checking if user exists: ", error.message);
                    return false;
                    // throw new Error("Sign-in failed");
            }
        },
    }
})

export {handler as GET, handler as POST}