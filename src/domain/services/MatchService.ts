import {Match} from "../entities/Match";
import {MatchRepository} from "../../infra/repositories/MatchRepository";
import crypto from "crypto";

export class MatchService{
    private matchRepository: MatchRepository;

    constructor() {
        this.matchRepository = new MatchRepository()
    }

    getAllMatchs(): Match[] | undefined {
        return this.matchRepository.getAllMatchs();
    }

    getMatchByScore(score:string):Match[] | undefined{
        return this.matchRepository.getMatchByScore(score);
    }

    getMatchByTeamName(name:string):Match[] | undefined{
        return this.matchRepository.getMatchByTeamName(name);
    }

    addMatch(match: Match) {
        const matchs = this.matchRepository.getAllMatchs();

        matchs.push({
            id: crypto.randomUUID(),
            ...match,
        });

        this.matchRepository.saveMatch(matchs);
    }
}