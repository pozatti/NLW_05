import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Users } from './Users';


@Entity('connections')
class Connections {
    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    socket_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => Users)
    user: Users;

    @Column()
    user_id: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Connections };