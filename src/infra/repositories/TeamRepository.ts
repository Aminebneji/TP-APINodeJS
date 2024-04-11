import {Team} from "../../domain/entities/Team"
import fs from 'fs';
import path from "path";
import {Match} from "../../domain/entities/Match";
import {MatchRepository} from "./MatchRepository";

export class TeamsRepository {
    private teams: Team[] = [];
    private matchRepository = new MatchRepository();
    private dataFilePath: string = path.join(__dirname, '..', 'data', 'teams.json');

    constructor() {
        this.teams = this.loadTeams();
    }

    private loadTeams(): Team[] {
        const data = fs.readFileSync(this.dataFilePath, 'utf-8')
        return JSON.parse(data);
    }

    getAllTeams(): Team[] {
        const data: string = fs.readFileSync(this.dataFilePath, 'utf-8');
        return JSON.parse(data);
    }

    getTeamByName(name: string) : Team | undefined{
        //console.log(this.teams);
        return this.teams.find((team: Team) => team.name === name);
    }

    getMatchesByTeam(teamName: string) {
        const matches = this.matchRepository.getAllMatchs();
        return matches.filter(match => match.equipe1 === teamName || match.equipe2 === teamName);
    }

    saveTeam(team: Team[]) {
        const data = JSON.stringify(team);

        fs.writeFileSync(this.dataFilePath, data);
    }
}