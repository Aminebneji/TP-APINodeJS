import {FollowedTeam} from "../../domain/entities/FollowedTeam";
import {TeamsRepository} from "./TeamRepository";
import fs from 'fs';
import path from "path";
import {Match} from "../../domain/entities/Match";
import {Team} from "../../domain/entities/Team";
import {UserRepository} from "./UserRepository";

/**
 * Repository qui gère le CRUD des Equipes Suivies
 */

export class FollowedTeamRepository {
    private followedTeams: FollowedTeam[] = [];
    private teamRepository: TeamsRepository = new TeamsRepository();
    private userRepository: UserRepository = new UserRepository();


    private datafilePath = path.join(__dirname, '..', 'data', 'followedTeam.json');

    constructor() {
        this.followedTeams = this.loadFollowedTeams();
    }
    private loadFollowedTeams(): FollowedTeam[] {
        const data = fs.readFileSync(this.datafilePath, 'utf-8')
        return JSON.parse(data);
    }

    /**
     * Récupère une Equipes Suivies en DB (ici followedTeam.json) par son id
     * @returns {FollowedTeam}
     * @param {string} id - id unique d'une équipe suivie
     * route /team/:name
     */
    getFollowedTeamById(id: string) {
        return this.followedTeams.find(followedTeam => followedTeam.id === id);
    }

    /**
     * Récupère une Equipes Suivies en DB (ici followedTeam.json) par l'id d'un(e) utilisateur(rice)
     * @returns {FollowedTeam}
     * @param {string} userId - id unique d'un(e) utilisateur(rice)
     * route /user/:userId
     */
    getFollowedTeamByUserId(userId: string) {
        const idFromUser = this.userRepository.getUserById(userId)
        return this.followedTeams.find(followedTeam => followedTeam.userId === idFromUser);
    }

    saveFollowedTeams(followedTeams: FollowedTeam[]) {
        const data = JSON.stringify(followedTeams);
        fs.writeFileSync(this.datafilePath, data);
    }

    /**
     * Récupère des Equipes suivies en DB et leurs matchs (ici followedTeams.json)
     * @returns {FollowedTeam[]}
     * route /followedTeams/
     */
    getAllFollowedTeams(): FollowedTeam[]{
        const data = fs.readFileSync(this.datafilePath, 'utf-8');
        const followedTeams = JSON.parse(data);

        return followedTeams.map((followedTeam: FollowedTeam) => {
            if (!followedTeam.id) return followedTeam.teams;
            const matches: Match[] = [];
            followedTeam.teams?.forEach((teams:Team) => {
                const {name} = teams
                const castedTeam = this.teamRepository.getTeamByName(name);

                if (castedTeam) {
                    const teamMatches = this.teamRepository.getMatchesByTeam(name);
                    matches.push(...teamMatches );
                }
            console.log(teams);
            })
            return { ...followedTeam, matches };
        });
    }
}