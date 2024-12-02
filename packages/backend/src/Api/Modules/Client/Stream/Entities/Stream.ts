import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'Entities/Base';
import { Project } from 'Api/Modules/Client/Project/Entities/Project';
import { StreamStatus } from 'Api/Modules/Client/Stream/TypeChecking/StreamStatus';
import {
  PlaybackPolicy,
  StreamProfile,
  Type,
} from 'Api/Modules/Client/Stream/TypeChecking/StreamData';
import { StreamPlatform } from 'Api/Modules/Client/Stream/TypeChecking/MultiStreamUserDestination';

@Entity('streams')
export class Stream extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({
    type: 'enum',
    enum: StreamStatus,
    default: StreamStatus.IDLE,
  })
  status: StreamStatus;

  @Column({ type: 'int', default: 0 })
  viewers: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  schedule: Date;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'  })
  lastSeen: Date;

  @Column({ type: 'varchar', nullable: true, unique: true })
  livepeerStreamId: string;

  @Column({ type: 'varchar', nullable: true })
  streamKey: string;

  @Column({ type: 'varchar', nullable: true })
  playbackId: string;

  @Column({ type: 'json', nullable: true })
  playBackPolicy: PlaybackPolicy;

  @Column({ type: 'json', nullable: true })
  profiles: StreamProfile[];

  @Column({ type: 'json', nullable: true })
  destinations: StreamPlatform[];

  @Column({ type: 'text', nullable: true })
  encryptedStreamData: string;

  @ManyToOne(() => Project, (project) => project.streams, { onDelete: 'CASCADE' })
  project: Project;

  public singleView() {
    return {
      title: this.title,
      description: this.description,
      status: this.status,
      viewers: this.viewers,
      lastSeen: this.lastSeen,
      streamKey: this.streamKey,
      playbackId: this.playbackId,
      isPublic: this.playBackPolicy.type === Type.Public ? true : false,
      schedule: this.schedule,
      profiles: this.profiles,
      destinations: this.destinations,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
    };
  }

  public listView() {
    return {
      identifier: this.identifier,
      title: this.title,
      description: this.description,
      status: this.status,
      viewers: this.viewers,
      lastSeen: this.lastSeen,
      streamKey: this.streamKey,
      playbackId: this.playbackId,
      isPublic: this.playBackPolicy.type === Type.Public ? true : false,
      schedule: this.schedule,
      profiles: this.profiles,
      destinations: this.destinations,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
    };
  }
}
