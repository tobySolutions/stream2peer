import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "Entities/Base";
import { Project } from "Api/Modules/Client/Project/Entities/Project";
import { StreamStatus } from "Api/Modules/Client/Stream/TypeChecking/StreamStatus"
  

@Entity("streams")
export class Stream extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({
    type: "enum",
    enum: StreamStatus,
    default: StreamStatus.IDLE,
  })
  status: StreamStatus;

  @Column({ type: "int", default: 0 })
  viewers: number;

  @Column({ type: "timestamp" })
  lastSeen: Date;

  @Column({ type: "varchar" })
  liveUrl: string;
  
  @Column({ type: "text", nullable: true })
  encryptedStreamData: string;

  @ManyToOne(() => Project, (project) => project.streams)
  project: Project;

  public singleView() {
    return {
      title: this.title,
      description: this.description,
      status: this.status,
      viewers: this.viewers,
      lastSeen: this.lastSeen,
      liveUrl: this.liveUrl,
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
      liveUrl: this.liveUrl,
    };
  }
}
