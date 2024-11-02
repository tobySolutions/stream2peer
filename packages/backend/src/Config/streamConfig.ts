import dotenv from "dotenv";

dotenv.config();

export const streamConfig = {
    livepeerApiClient: process.env["LIVEPEER_API_KEY"],
    livepeerSharedSecret: process.env["LIVEPEER_SHARED_SECRET"]
}