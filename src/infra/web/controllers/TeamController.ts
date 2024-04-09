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
    const teams = teamService.getTeamByName(requestedName);

    if (!teams || teams.name !== requestedName) {
        return res.status(404).json({
            statusCode: 404,
            message: `Aucune équipe trouvée avec le pseudo "${requestedName}".`
        });
    }

    console.log(teams);

    response(res, {
        statusCode: 200,
        message: 'OK',
        data: teams
    });
}