import {Request, Response} from "express";
import {response} from "../../../utils/response";
import {FollowedTeamService} from "../../../domain/services/FollowedTeamService";
import {FollowedTeam} from "../../../domain/entities/FollowedTeam";

const followedTeamService = new FollowedTeamService();

export const getAllFollowedTeam = (req: Request, res: Response)=> {
    const followedTeams = followedTeamService.getAllFollowedTeams();
    //console.log(followedTeams);

    if (!followedTeams) {
        response(res, {statusCode: 404, message: 'FollowedTeams not found'});
    } else {
        response(res, {
            statusCode: 200,
            message: 'OK',
            data: followedTeams ,
        })
    }
}

export const addFollowedTeam = (req: Request, res: Response) => {
    const followedTeam: FollowedTeam = req.body;
    followedTeamService.addFollowedTeam(followedTeam);

    if (!followedTeam) {
        response(res, {statusCode: 404, message: 'FollowedTeams not found'});
    } else {
        response(res, {
            statusCode: 201,
            message: 'Team successfully followed',
            data: followedTeam
        });
    }
}