import {Match} from "../../domain/entities/Match";
import fs from 'fs';
import path from "path";

export class MatchRepository {
    private dataFilePath = path.join(__dirname, '..', 'data', 'matches.json');

    getAllMatchs(): Match[] {
        const data: string = fs.readFileSync(this.dataFilePath, 'utf-8');
        return JSON.parse(data);
    }

    getMatchByScore(wantedScore: string): Match[] {
        const matchs = this.getAllMatchs();
        const findedMatchs = matchs.filter((match) => match.score === wantedScore);
        return findedMatchs;
    }

    getMatchByTeamName(name:string):Match[]{
        const matchs = this.getAllMatchs();
        const findedMatchs = matchs.filter((match) => match.equipe1 === name || match.equipe2 === name);
        return findedMatchs;
    }

    saveMatch(match: Match[]) {
        const data = JSON.stringify(match);
        fs.writeFileSync(this.dataFilePath, data);
    }
}