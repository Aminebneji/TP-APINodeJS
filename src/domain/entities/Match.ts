import {Team} from "./Team";

export interface Match{
    id?:string;
    equipe1: string,
    equipe2: string,
    score: string,
    date: Date,
    map: string,
}