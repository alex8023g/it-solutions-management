import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ContactLink } from './models/contact-link.model';
import { Profile } from './models/profile.model';
import { Project } from './models/project.model';
import { Skill } from './models/skill.model';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, {
    nullable: true,
    description: 'The card owner, or null before the database has been seeded.',
  })
  profile() {
    return this.profileService.findProfile();
  }

  // Resolved as fields rather than in the root query so a client asking only
  // for the header does not pay for the related tables.
  @ResolveField(() => [Skill])
  skills() {
    return this.profileService.findSkills();
  }

  @ResolveField(() => [Project])
  projects() {
    return this.profileService.findProjects();
  }

  @ResolveField(() => [ContactLink])
  links() {
    return this.profileService.findLinks();
  }
}
