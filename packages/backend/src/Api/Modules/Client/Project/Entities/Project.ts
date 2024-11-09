import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AuthAccount } from 'Api/Modules/Client/Authentication/Entities/AuthAccount';
import { ProjectPeer } from '../TypeChecking/ProjectRole';
import { BaseEntity } from 'src/Entities/Base';
import { Stream } from 'Api/Modules/Client/Stream/Entities/Stream';
import { MultiStreamToken } from '../../Stream/TypeChecking/MultiStreamUserDestination';

@Entity('projects')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image_url: string;

  @ManyToOne(() => AuthAccount, (authAccount) => authAccount.projects)
  owner: AuthAccount;

  @Column({ type: 'simple-json' })
  peers_roles: ProjectPeer[];

  @Column({ type: 'simple-json', default: [] })
  stream_tokens: MultiStreamToken[];

  @OneToMany(() => Stream, (stream) => stream.project)
  streams: Stream[];

  @ManyToMany(() => AuthAccount, (authAccount) => authAccount.projects)
  @JoinTable({
    name: 'user_projects',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'auth_account_id', referencedColumnName: 'id' },
  })
  peers_ids: AuthAccount[];

  public singleView() {
    return {
      title: this.title,
      description: this.description,
      image_url: this.image_url,
      owner: this.owner,
      peers_roles: this.peers_roles,
      stream_tokens: this.stream_tokens,
    };
  }

  public listView() {
    return {
      identifier: this.identifier,
      id: this.id,
      title: this.title,
      description: this.description,
      image_url: this.image_url,
      stream_tokens: this.stream_tokens,
    };
  }
}
