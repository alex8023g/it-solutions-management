import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ContactLink } from './contact-link.model';
import { Project } from './project.model';
import { Skill } from './skill.model';

@ObjectType({ description: 'The specialist this card presents.' })
export class Profile {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  fullName!: string;

  @Field(() => String, { description: 'Short professional tagline shown under the name.' })
  headline!: string;

  @Field(() => String, { nullable: true })
  bio!: string | null;

  @Field(() => String, { nullable: true })
  location!: string | null;

  @Field(() => String, { nullable: true })
  email!: string | null;

  @Field(() => String, { nullable: true })
  photoUrl!: string | null;

  @Field(() => Boolean)
  availableForWork!: boolean;

  @Field(() => [Skill], { description: 'Ordered by position.' })
  skills!: Skill[];

  @Field(() => [Project], { description: 'Ordered by position.' })
  projects!: Project[];

  @Field(() => [ContactLink], { description: 'Ordered by position.' })
  links!: ContactLink[];
}
