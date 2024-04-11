import { User } from "./User";
import { Team } from "./Team";

export interface FollowedTeam {
    id?:string;
    userId?: User["id"];
    teams?: Team[];
}