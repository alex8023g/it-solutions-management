import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A technology or competence shown on the card.' })
export class Skill {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  category!: string | null;

  @Field(() => Int, { nullable: true, description: 'Self-assessed proficiency, 1-5.' })
  level!: number | null;

  @Field(() => Int, { description: 'Display order; lower comes first.' })
  position!: number;
}
