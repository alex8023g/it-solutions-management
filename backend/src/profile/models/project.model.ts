import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A portfolio entry.' })
export class Project {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  url!: string | null;

  @Field(() => String, { nullable: true })
  repoUrl!: string | null;

  @Field(() => [String], { description: 'Stack the project was built with.' })
  stack!: string[];

  @Field(() => Int, { nullable: true })
  year!: number | null;

  @Field(() => Int, { description: 'Display order; lower comes first.' })
  position!: number;
}
