import {
  DatabaseClient,
  DatabseInstance as DatabaseInstance,
} from "~/config/database";

export class UserDAO {
  private db: DatabaseInstance = DatabaseClient.getClient();

  constructor() {
    this.db = DatabaseClient.getClient();
  }

  public async getById(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  public async getByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  public async create(name: string, email: string) {
    return this.db.user.create({ data: { name, email } });
  }
}
