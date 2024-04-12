import {Match} from "../../domain/entities/Match";
import fs from 'fs';
import path from "path";


/**
 * Repository qui gère le CRUD des Matchs
 */

export class MatchRepository {
    private dataFilePath = path.join(__dirname, '..', 'data', 'matches.json');

    /**
     * Récupère des Matchs en DB (ici matches.json)
     * @returns {Match[]}
     * route /matchs/
     */
    getAllMatchs(): Match[] {
        const data: string = fs.readFileSync(this.dataFilePath, 'utf-8');
        return JSON.parse(data);
    }

    /**
     * Récupère des Matchs en DB (ici matches.json) par leurs score
     * @returns {Match[]}
     * @param {string} wantedScore - score voulu pour trouver l'équipe
     * route /matchs/:score
     */
    getMatchByScore(wantedScore: string): Match[] {
        const matchs = this.getAllMatchs();
        const findedMatchs = matchs.filter((match) => match.score === wantedScore);
        return findedMatchs;
    }

    /**
     * Récupère des Matchs en DB (ici matches.json) par le nom d'une équipe
     * @returns {Match[]}
     * @param {string} wantedScore - nom d'une équipe
     * route /team/:name
     */
    getMatchByTeamName(name:string):Match[]{
        const matchs = this.getAllMatchs();
        return  matchs.filter((match) => match.equipe1 === name || match.equipe2 === name);
    }

    saveMatch(match: Match[]) {
        const data = JSON.stringify(match);
        fs.writeFileSync(this.dataFilePath, data);
    }
}