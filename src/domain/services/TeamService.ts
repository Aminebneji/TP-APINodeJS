import {Team} from "../entities/Team"
import {TeamsRepository} from "../../infra/repositories/TeamRepository";

export class TeamService{
    private teamsRepository: TeamsRepository;

    constructor() {
        this.teamsRepository = new TeamsRepository();
    }

    getAllTeams():Team[] | undefined{
        return this.teamsRepository.getAllTeams()
    }

    getTeamByName(name:string):Team | undefined{
        return this.teamsRepository.getTeamByName(name);
    }
}