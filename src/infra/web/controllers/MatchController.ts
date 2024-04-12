import {Request, Response} from "express";
import {MatchService} from "../../../domain/services/MatchService";
import {response} from "../../../utils/response";

const matchService = new MatchService();

export const getAllMatchs = (req: Request, res: Response) => {
    const matchs = matchService.getAllMatchs();
    //console.log(matchs);
    // ou console.table(matchs);

    if (!matchs) {
        response(res, {statusCode: 404, message: 'Match not found'});
    } else {
        response(res, {
            statusCode: 200,
            message: 'OK',
            data: matchs
        })
    }
}

export const getMatchsByScore = (req: Request, res: Response) => {
    const matchs = matchService.getMatchByScore(req.params.score);
    //console.log(matchs);

    if (!matchs) {
        response(res, {statusCode: 404, message: 'Match not found'});
    } else {
        response(res, {
            statusCode: 200,
            message: 'OK',
            data: matchs
        })
    }
}

export const getMatchesByTeamName = (req: Request, res:Response) => {
    const matchs = matchService.getMatchByTeamName(req.params.name);
    console.log(matchs)

    if (!matchs) {
        response(res, {statusCode: 404, message: 'Match not found'});
    } else {
        response(res, {
            statusCode: 200,
            message: 'OK',
            data: matchs
        });
    }
}