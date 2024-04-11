import {FollowedTeam} from "../../domain/entities/FollowedTeam";
import {TeamsRepository} from "./TeamRepository";
import fs from 'fs';
import path from "path";
import {Match} from "../../domain/entities/Match";
import {stringify} from "querystring";
import {Team} from "../../domain/entities/Team";

export class FollowedTeamRepository {
    private followedTeams: FollowedTeam[] = []
    private teamRepository: TeamsRepository = new TeamsRepository();

    private datafilePath = path.join(__dirname, '..', 'data', 'followedMatch.json');

    constructor() {
        this.followedTeams = this.loadFollowedTeams();
    }
    private loadFollowedTeams(): FollowedTeam[] {
        const data = fs.readFileSync(this.datafilePath, 'utf-8')
        return JSON.parse(data);
    }

    saveFollowedTeams(followedTeams: FollowedTeam[]) {
        const data = JSON.stringify(followedTeams);
        fs.writeFileSync(this.datafilePath, data);
    }

    getAllFollowedTeams(): FollowedTeam[]{
        const data = fs.readFileSync(this.datafilePath, 'utf-8');
        const followedTeams = JSON.parse(data);

        return followedTeams.map((followedTeam: FollowedTeam) => {
            if (!followedTeam.id) return followedTeam.teams;
            const matches: Match[] = [];
            followedTeam.teams?.forEach((team:Team) => {
                const {name} = team
                const castedTeam = this.teamRepository.getTeamByName(name);

                if (castedTeam) {
                    const teamMatches = this.teamRepository.getMatchesByTeam(name);
                    matches.push(...teamMatches);
                }
            //console.log(team)
            })
            return { ...followedTeam, matches };
        });
    }
}