import {Match} from "../entities/Match";
import {MatchRepository} from "../../infra/repositories/MatchRepository";

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
}