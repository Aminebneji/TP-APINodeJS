import {Request, Response} from "express";
import {TeamService} from "../../../domain/services/TeamService";
import {response} from "../../../utils/response";

const teamService = new TeamService();

export const getAllTeams = (req: Request, res: Response)=> {
    const teams = teamService.getAllTeams();
    console.log(teams);
    // ou console.table(teams);
    response(res, {
        statusCode:200,
        message: 'OK',
        data: teams
    })
}

export const getTeamByName = (req: Request, res: Response) => {
    const requestedName = req.params.name;
    console.log(requestedName);
    const teams = teamService.getTeamByName(requestedName);
    if(!teams){
        response(res, { statusCode: 404, message: 'Post not found' });
    } else {
        response(res, {
            statusCode: 200,
            message: 'OK',
            data: teams
        });
    }
}
