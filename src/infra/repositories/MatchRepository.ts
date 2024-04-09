import {Match} from "../../domain/entities/Match";
import fs from 'fs';
import path from "path";

export class MatchRepository{
    private dataFilePath = path.join(__dirname, '..', 'data', 'matchs.json');

    getAllMatchs(): Match[] {
        const data:string = fs.readFileSync(this.dataFilePath, 'utf-8');
        return JSON.parse(data);
    }

    getMatchByScore(wantedScore: string): Match[] {
        const matchs = this.getAllMatchs();
        const findedMatchs = matchs.filter((match) => match.score === wantedScore);

        if (findedMatchs.length === 0) {
            throw new Error(`No match found with score: ${wantedScore}`);
        }
        return findedMatchs;
    }
}