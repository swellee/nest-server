import { Role, UserStatus } from "src/util/const";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email', type: 'varchar' })
    email: string

    @Column({ name: 'password', type: 'varchar', select: false })
    password: string

    @Column({ name: 'roles', enum: Role, type: 'enum', array: true })
    roles: Role[]

    @Column({ name: 'status', enum: UserStatus, type: 'enum', default: UserStatus.ACTIVE })
    status: UserStatus
}