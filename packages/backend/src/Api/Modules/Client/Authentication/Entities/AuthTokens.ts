import { BaseEntity } from "Entities/Base";
import { Column, Entity } from "typeorm";
import { DateTime } from "luxon";

@Entity("auth_tokens")
export class AuthTokens extends BaseEntity {
  @Column({ type:'varchar' })
  email: string;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: "timestamp" })
  expiresOn: DateTime;
}
