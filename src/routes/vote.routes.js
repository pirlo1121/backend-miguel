import express from "express";
import { addVote, getVotesByProduct, getVoteCount, getAllVotes, getVotesRanking, getVotesRankingByOwner  } from "../controllers/vote.controller.js";
import { validarToken, isActive } from "../middlewares/auth.js";


const routerVotes = express.Router();


routerVotes.get("/", getAllVotes);

routerVotes.get("/ranking", getVotesRanking);

routerVotes.get("/ranking/owner", validarToken, getVotesRankingByOwner);

routerVotes.post("/add/:id", validarToken, isActive ,addVote);

routerVotes.post("/:productId", getVotesByProduct);

routerVotes.post("/:productId/count", getVoteCount);





export default routerVotes;
