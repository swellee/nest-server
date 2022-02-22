import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, RelationId } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserProfile {
    @PrimaryColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @RelationId('user')
    userId: number

    @Column({ name: 'first_name', type: 'varchar', nullable: true })
    firstName: string

    @Column({ name: 'last_name', type: 'varchar', nullable: true })
    lasName: string
}