import {Request, Response} from "express";
import {MatchService} from "../../../domain/services/MatchService";
import {response} from "../../../utils/response";

const matchService = new MatchService();

export const getAllMatchs = (req: Request, res: Response)=> {
    const matchs = matchService.getAllMatchs();
    console.log(matchs);
    // ou console.table(matchs);
    response(res, {
        statusCode:200,
        message: 'OK',
        data: matchs
    })
}

export const getMatchsByScore = (req: Request, res:Response) => {
    const matchs = matchService.getMatchByScore(req.params.score);
    console.log(matchs);

    response(res, {
        statusCode:200,
        message:'OK',
        data:matchs
    })
}