import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from 'Entities/Base';
import { AuthAccountType } from '../TypeChecking/AuthAccount';
import { Project } from 'Api/Modules/Client/Project/Entities/Project';
import { MultiStreamToken } from '../../Stream/TypeChecking/MultiStreamUserDestination';
import { Notification } from '../TypeChecking/Notification';

@Entity('auth_accounts')
export class AuthAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({
    type: 'enum',
    enum: AuthAccountType,
  })
  auth_provider: AuthAccountType;

  @Column({ type: 'simple-json', nullable: true})
  stream_tokens: MultiStreamToken[];

  @Column({type:"simple-json", nullable: true})
  notifications: Notification[];

  @ManyToMany(() => Project, (project) => project.peers_ids)
  projects: Project[];

  public get forWallet() {
    return {
      address: JSON.parse(this.userId).address,
      nonce: JSON.parse(this.userId).nonce,
    };
  }
}
