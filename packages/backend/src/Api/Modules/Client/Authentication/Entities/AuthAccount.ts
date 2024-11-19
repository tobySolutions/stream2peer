import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from 'Entities/Base';
import { AuthAccountType } from '../TypeChecking/AuthAccount';
import { Project } from 'Api/Modules/Client/Project/Entities/Project';
import { MultiStreamToken } from '../../Stream/TypeChecking/MultiStreamUserDestination';
import { Notification, NotificationStatus } from '../TypeChecking/Notification';
import { shortenText } from 'Utils/transformString';

@Entity('auth_accounts')
export class AuthAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({type:'varchar'})
  username: string;

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

  public forWallet() {
    return {
      address: JSON.parse(this.userId).address,
      nonce: JSON.parse(this.userId).nonce,
    };
  }

  public getProfile() {
    return {
      username: this.username,
      userId: this.userId,
      auth_provider: this.auth_provider,
      notifications: this.notifications?.map(notification=>(shortenText(notification.text))),
      notificationsCount: this.notifications?.filter(notification=>(notification.status!=NotificationStatus.READ)).length,
      projects: this.projects?.map(project=>project.listView)
    };
  }

    public getNotifications(){
      return{
        notifications: this.notifications?.map(notification=>(shortenText(notification.text))),
        notificationsCount: this.notifications?.filter(notification=>(notification.status!=NotificationStatus.READ)).length,
    }
  }
}
