import { autoInjectable } from "tsyringe";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { AuthAccount } from "Api/Modules/Client/Authentication/Entities/AuthAccount";
import { Project } from "Api/Modules/Client/Project/Entities/Project";
import { ProjectPeer, ProjectRole } from "Api/Modules/Client/Project/TypeChecking/ProjectRole";
import { Repository, QueryRunner } from "typeorm";
import { NULL_OBJECT } from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { PaginationDto } from "Api/Modules/Common/TypeChecking/GeneralPurpose/PaginationDto";
import { generatePaginationMeta } from "Api/Modules/Common/Helpers/PaginationMeta";
import { JwtHelper } from "Api/Modules/Common/Helpers";
import { businessConfig } from "Config/businessConfig";
import { EmailService } from "Logic/Services/Email/EmailService";

@autoInjectable()
class ProjectService {
  private projectRepository;
  private authRepository;

  constructor(private dbContext?: DbContext) {
    this.projectRepository = dbContext?.getEntityRepository(
      Project
    ) as Repository<Project>;
    this.authRepository = dbContext?.getEntityRepository(
      AuthAccount
    ) as Repository<AuthAccount>;
  }

  /**
   * Creates a new project record in the database.
   */
  public async createProject(projectData:
    {userId:string, title:string, description:string, imageUrl:string} & 
    {
    queryRunner: QueryRunner;
  }) {
    const { userId, title, description, imageUrl, queryRunner } =
      projectData;

    const user = await this.authRepository.findOne({
        where: { userId },
    });

    const project = new Project();

    Object.assign(project, {
      title,
      description,
      image_url: imageUrl,
      owner: user,
      peers_ids: [user!],
      peers_roles: [{ userId, role: ProjectRole.HOST }],
    });

    await queryRunner.manager.save(project);

    return project;
  }

  /**
   * Fetches a project by its ID.
   */
  public async getProjectById(projectId: number): Promise<Project | null> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: { owner: true, streams: true },
    });

    return project || NULL_OBJECT;
  }

  /**
   * Fetches a project by its identifier.
   */
  public async getProjectByIdentifier(identifier: string): Promise<Project | null> {
    const project = await this.projectRepository.findOne({
      where: { identifier },
      relations: { owner: true, streams: true, peers_ids:true },
    });
    return project || NULL_OBJECT;
  }

  /**
  * Fetches a project by its title.
  */
  public async getProjectByTitle(title: string, userId:string): Promise<Project | null> {
    const project = await this.projectRepository.findOne({
      where: { title, peers_ids:{userId} },
      relations: { owner: true, streams: true },
    });
  
    return project || NULL_OBJECT;
  }

    /**
   * Lists projects where a user is in the peers_ids with pagination support.
   */
  public async listProjectsByPeerId(
    userId: string,
    paginationDto: PaginationDto
  ) {
    const { pageNumber = 0, documentSize = 10 } = paginationDto;

    const [projects, totalCount] = await this.projectRepository.findAndCount({
      where: {
        peers_ids: {
          userId,
        },
      },
      skip: pageNumber * documentSize, 
      take: documentSize,
      relations: { peers_ids: true, owner: true, streams: true },
    });

    const paginationMeta = generatePaginationMeta(totalCount, pageNumber, documentSize);

    return { data: projects, meta: paginationMeta };
  }


  /**
   * Lists projects by owner ID with pagination support.
   */
  public async listProjectsByOwnerId(
    userId: string,
    paginationDto: PaginationDto
  ) {
    const { pageNumber = 0, documentSize = 10 } = paginationDto;

    const [projects, totalCount] = await this.projectRepository.findAndCount({
      where: { owner:{ userId } },
      skip: pageNumber * documentSize,
      take: documentSize,
      relations: { owner: true, streams: true },
    });

    const paginationMeta = generatePaginationMeta(totalCount, pageNumber, documentSize);

    return { data: projects, meta: paginationMeta };
  }

    /**
   * Authorization to make Updates in the Project
   * A user is authorized if they are the project owner or co-host.
   * @param projectId - The ID of the project to check.
   * @param user - The user object containing userId to check authorization for.
   * @returns {Promise<boolean>} - True if the user is authorized, otherwise false.
   */
  public async isUserAuthorized(project: Project, user: AuthAccount): Promise<boolean> {
    return project.owner.userId === user.userId || 
          project.peers_roles.some(peer => peer.userId === user.userId && peer.role === ProjectRole.CO_HOST);
  }

  /**
   * Authorization to view the Project
   * A user is authorized if they are a peer in the project.
   * @param projectId - The ID of the project to check.
   * @param user - The user object containing userId to check authorization for.
  */
  public async viewProject(project: Project,user: AuthAccount): Promise<boolean>{
    return project.peers_roles.some((peer) => {console.log(peer.userId);return peer.userId === user.userId});
  }

  /**
   * Sends an invitation Email to Peer to Join Project
   */
  public async sendProjectInvite(
    users: ProjectPeer[],
    projectId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryRunner?: QueryRunner
  ) {
    const projectInviteLinks = users.map(({ userId, role }) => {
      const token = JwtHelper.generateInviteToken({
        userId,
        projectId,
        role,
      });
  
      return {
        userId,
        projectInviteLink: `${businessConfig.projectInviteLink}/project-invite/${projectId}?token=${token}`
      };
    });
  
    // Create an invitation record in the system
    // save data to notifications table
    /*const projectInvitation = await ProjectService.createInvitation({
        projectId,
        userId,
        queryRunner,
    });*/
  
    if (users.length === 1) {
      await EmailService.sendProjectInviteLink(projectInviteLinks[0]);
    } else {
      await EmailService.sendBulkProjectInviteLink(projectInviteLinks);
    }
}
  

  /**
   * Adds a user as a peer to a project (peer_ids and peer_roles).
   */
  public async addProjectPeer(
    projectId: string,
    peerData: ProjectPeer,
    queryRunner: QueryRunner
  ) {
    const project = await this.getProjectByIdentifier(projectId);
    if (!project || project === NULL_OBJECT) return NULL_OBJECT;

    const { userId, role } = peerData;
    const peer = await this.authRepository.findOne({
        where: { userId },
    });

    if (!project.peers_ids.some(peer => peer.userId==userId)) {
      project.peers_ids.push(peer!);
    }

    const existingRole = project.peers_roles.find(peerRole => peerRole.userId === userId);
    if (existingRole) {
      existingRole.role = role;
    } else {
      project.peers_roles.push({ userId, role });
    }
    
    await queryRunner.manager.save(project);

    return project;
  }

  /**
   * Removes a user from peer_ids and peer_roles of a project.
   */
  public async removeProjectPeer(
    projectId: string,
    userId: string,
    queryRunner: QueryRunner
  ) {
    const project = await this.getProjectByIdentifier(projectId);
    if (!project || project === NULL_OBJECT) return NULL_OBJECT;

    project.peers_ids = project.peers_ids.filter(peer => peer.userId !== userId);

    project.peers_roles = project.peers_roles.filter(peerRole => peerRole.userId !== userId);

    await queryRunner.manager.save(project);

    return project;
  }

  /**
   * Returns the owner ID of a project.
   */
  public async getProjectOwnerId(projectId: string): Promise<string | null> {
    const project = await this.getProjectByIdentifier(projectId);
    if (!project || project === NULL_OBJECT) return null;

    return project.owner.userId;
  }

/**
 * Updates a project record.
 */
public async updateProjectRecord(
  identifier: string | number, 
  identifierType: "id" | "identifier", 
  updatePayload: Partial<Project>,
  queryRunner: QueryRunner
) {
  let project;

  if (identifierType === "id") {
    project = await this.getProjectById(identifier as number);
  } else if (identifierType === "identifier") {
    project = await this.getProjectByIdentifier(identifier as string);
  }

  if (!project || project === NULL_OBJECT) return NULL_OBJECT;

  Object.assign(project, updatePayload);

  await queryRunner.manager.save(project);

  return project;
}

  /**
   * Deletes a project record.
   */
  public async deleteProject(
    projectId: string,
    queryRunner: QueryRunner
  ) {
    const project = await this.getProjectByIdentifier(projectId);
    if (!project || project === NULL_OBJECT) return NULL_OBJECT;

    await queryRunner.manager.remove(project);

    return project;
  }
} 

export default new ProjectService();
