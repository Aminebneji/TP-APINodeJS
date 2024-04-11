import {Team} from "../entities/Team"
import {TeamsRepository} from "../../infra/repositories/TeamRepository";
import {Match} from "../entities/Match";
import crypto from "crypto";

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

    getMatchesByTeam(teamName:string){
        return this.teamsRepository.getMatchesByTeam(teamName);
    }
    addTeam(team: Team) {
        const teams = this.teamsRepository.getAllTeams();
        teams.push({
            id: crypto.randomUUID(),
            ...team,
        });

        this.teamsRepository.saveTeam(teams);
    }
}