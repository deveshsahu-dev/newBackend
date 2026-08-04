import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { app } from "./app.js"; 
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config({
    path: './.env'
});
connectDb()
.then(()=>{

    app.on('error', (err) => {
        console.error(err.message);
        throw err;
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.error(err.message);
    throw err;
}) 