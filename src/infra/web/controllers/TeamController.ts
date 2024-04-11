import {Request, Response} from "express";
import {TeamService} from "../../../domain/services/TeamService";
import {response} from "../../../utils/response";

const teamService = new TeamService();

export const getAllTeams = (req: Request, res: Response)=> {
    const teams = teamService.getAllTeams();
    //console.log(teams);
    // ou console.table(teams);
    if (!teams) {
        response(res, { statusCode: 404, message: 'Team not found' });
    } else {
        response(res, {
            statusCode: 200,
            message: 'OK',
            data: teams
        })
    }
}
export const getTeamByName = (req: Request, res: Response) => {
    const requestedName = req.params.name;
    //console.log(requestedName);
    const teams = teamService.getTeamByName(requestedName);
    if(!teams){
        response(res, { statusCode: 404, message: 'Team not found' });
    } else {
        response(res, {
            statusCode: 200,
            message: 'OK',
            data: teams
        });
    }
}

    export const getMatchesByTeam = (req: Request, res:Response) => {
        const requestedTeamName: string = req.params.name;
        console.log(requestedTeamName)
        const matchs = teamService.getMatchesByTeam(requestedTeamName);

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
