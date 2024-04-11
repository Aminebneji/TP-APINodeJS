import {Match} from "./Match";

export interface Team {
    id?:string;
    name: string;
    players: Players[];
    matchs?: Match[]
}

interface Players {
    pseudo: string;
}