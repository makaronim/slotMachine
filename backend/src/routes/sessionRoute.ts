// import express, {Request, Response} from "express";
//
// const SessionRouter = express.Router();
//
// SessionRouter.get("/session", async (req: Request, res: Response) => {
//     // Define routes within the router
//     SessionRouter.get("/set-session", (req: Request, res: Response) => {
//         req.session.username = "JohnDoe";
//         res.send("Session data has been set.");
//     });
//
//     SessionRouter.get("/get-session", (req: Request, res: Response) => {
//         if (req.session.username) {
//             res.send(`Hello, ${req.session.username}!`);
//         } else {
//             res.send("No session data found.");
//         }
//     });
//
//     SessionRouter.get("/destroy-session", (req: Request, res: Response) => {
//         req.session.destroy((err) => {
//             if (err) {
//                 res.status(500).send("Could not destroy session");
//             } else {
//                 res.send("Session destroyed successfully.");
//             }
//         });
//     });
// })
//
// export default SessionRouter;
