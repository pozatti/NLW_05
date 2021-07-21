import { getCustomRepository, Repository } from "typeorm";
import { Connections } from "../entities/Connections";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";


interface IConnectionsCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}


class ConnectionsService {
    private connectionsRepository: Repository<Connections>

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({ socket_id, user_id, admin_id, id }: IConnectionsCreate) {
        const connection = this.connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connectionsRepository.save(connection);

        return connection;
    }

    async findUserById(user_id: string) {
        const connection = await this.connectionsRepository.findOne({ user_id });

        return connection;
    }

    async findAllWithoutAdmin() {
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ['user']
        });

        return connections;
    }

    async findBySocketId(socket_id: string) {
        const connections = await this.connectionsRepository.findOne({ socket_id });

        return connections;
    }

    async updateAdminId(user_id: string, admin_id: string) {
        await this.connectionsRepository.createQueryBuilder()
            .update(Connections)
            .set({ admin_id })
            .where("user_id = :user_id", { user_id })
            .execute();
    }
}

export { ConnectionsService };