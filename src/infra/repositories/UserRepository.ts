import {User} from "../../domain/entities/User";
import fs from 'fs';
import path from "path";
import crypto from 'crypto';

/**
 * Repository qui gère le CRUD des Utilisateurs
 */

export class UserRepository {
    private filePath = path.join(__dirname, '..', 'data', 'users.json');

    getAllUsers(): User[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');

        return JSON.parse(data);
    }

    getUserByPseudo(pseudo: string) {
        const users = this.getAllUsers();
        return users.find(user => user.pseudo === pseudo);
    }

    getUserByNames(firstName: string, lastName: string) {
        const users = this.getAllUsers();
        return users.find(user => user.firstname === firstName && user.lastname === lastName);
    }

    getUserById(id: string,) {
        const users = this.getAllUsers();
        const user = users.find(user => user.id === id );
        return user?.id;
    }

    createUser(user: User) {
        const users = this.getAllUsers();
        users.push({
            ...user,
            id: crypto.randomUUID()
        })

        fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
    }
}