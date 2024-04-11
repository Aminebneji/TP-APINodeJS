import {FollowedTeamRepository} from "../../infra/repositories/FollowedTeamRepository";
import {FollowedTeam} from "../entities/FollowedTeam";
import crypto from "crypto";
export class FollowedTeamService {
    private followedTeamRepository: FollowedTeamRepository;

    constructor() {
        this.followedTeamRepository = new FollowedTeamRepository()
    }

    getAllFollowedTeams(): FollowedTeam[] {
        return this.followedTeamRepository.getAllFollowedTeams();
    }


    addFollowedTeam(followedTeam: FollowedTeam) {
        const followedTeams = this.followedTeamRepository.getAllFollowedTeams();

        followedTeams.push({
            id: crypto.randomUUID(),
            ...followedTeam,
        });

        this.followedTeamRepository.saveFollowedTeams(followedTeams);
    }
}