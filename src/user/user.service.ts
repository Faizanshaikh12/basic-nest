import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.interface";

@Injectable()
export class UserService {
  public users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUser(email: string): Promise<User> {
    const userData = this.users.filter(i => i.email === email);
    return Promise.resolve(userData[0]);
  }

  postUser(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }

  deleteUser(email: string): User[] {
    const deletedUser = this.users.filter(i => i.email !== email);
    this.users = deletedUser;
    return deletedUser;
  }
}
