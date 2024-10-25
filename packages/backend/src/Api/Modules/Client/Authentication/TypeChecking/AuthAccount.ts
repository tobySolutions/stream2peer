import DbQueryRunner from "TypeChecking/QueryRunner";
import { DateTime } from "luxon";

export enum AuthAccountType {
    GOOGLE = "google",
    GITHUB = "github",
    METAMASK = "metamask",
} 

export type CreateAuthAccountRecordDto = {
    userId: number;            
    authProvider: string;
    authProviderId: string;    
  } & DbQueryRunner;       

type UpdateAuthAccountRecordArgsPayload = {
  authProvider?: string;
  userId?: string;
  lastLoginDate?: DateTime;
  isActive?: boolean;
  isDeleted?: boolean;       
};

export type UpdateAuthAccountRecordArgs = {
  identifierType: "id" | "identifier" | "userId"; 
  userId: string;
  updateAuthAccountPayload: UpdateAuthAccountRecordArgsPayload;
};

