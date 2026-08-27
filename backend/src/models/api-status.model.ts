import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Liveness information returned by the API.' })
export class ApiStatus {
  @Field(() => String)
  message!: string;

  @Field(() => Date, { description: 'Server time when the query was handled.' })
  timestamp!: Date;
}
