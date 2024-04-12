import {Team} from "../../domain/entities/Team"
import fs from 'fs';
import path from "path";
import {Match} from "../../domain/entities/Match";
import {MatchRepository} from "./MatchRepository";


/**
 * Repository qui gère le CRUD des Equipes
 */
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

    /**
     * Récupère toutes les équipes en DB (ici teams.json)
     * @returns {Team[]}
     * route /teams/
     */
    getAllTeams(): Team[] {
        const data: string = fs.readFileSync(this.dataFilePath, 'utf-8');
        return JSON.parse(data);
    }

    /**
     * Récupère des équipes en DB (ici teams.json) par leurs nom
     * @returns {Team[]}
     * @param {string} name - nom d'une équipe
     */
    getTeamByName(name: string) : Team | undefined{
        //console.log(this.teams);
        return this.teams.find((team: Team) => team.name === name);
    }

    /**
     * Récupère des Matchs en DB (ici teams.json) par leurs nom
     * @returns {Match[]}
     * @param {string} Teamname - nom d'une équipe
     */
    getMatchesByTeam(teamName: string) {
        const matches = this.matchRepository.getAllMatchs();
        return matches.filter(match => match.equipe1 === teamName || match.equipe2 === teamName);
    }

   // getMatchesByTeam(teamName: string) {
   //     const team = this.getTeamByName(teamName);
   //     const matches = this.matchRepository.getAllMatchs();
   //     const match =  matches.filter(match => match.equipe1 === teamName || match.equipe2 === teamName);
   //     return { team,match};
   // }

    saveTeam(team: Team[]) {
        const data = JSON.stringify(team);

        fs.writeFileSync(this.dataFilePath, data);
    }
}