import {Team} from "../../domain/entities/Team"
import fs from 'fs';
import path from "path";

export class TeamsRepository{
    private teams : Team[] = [];
    private dataFilePath:string = path.join(__dirname, '..', 'data', 'teams.json');
constructor() {
    this.teams = this.loadTeams();
}

    getAllTeams(): Team[]{
        const data:string = fs.readFileSync(this.dataFilePath, 'utf-8');
        return JSON.parse(data);
    }

    getTeamByName(name: string) {
        console.log(this.teams);
        return this.teams.find((team :Team) => team.name === name);
    }

    private loadTeams(): Team[] {
        const data = fs.readFileSync(this.dataFilePath, 'utf-8')
        return JSON.parse(data);
    }
}