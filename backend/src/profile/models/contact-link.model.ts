import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ContactLinkKind } from '../../generated/prisma/enums';

registerEnumType(ContactLinkKind, {
  name: 'ContactLinkKind',
  description: 'What kind of channel a contact link points at.',
});

@ObjectType({ description: 'An outbound way to reach the specialist.' })
export class ContactLink {
  @Field(() => String)
  id!: string;

  @Field(() => ContactLinkKind)
  kind!: ContactLinkKind;

  @Field(() => String)
  label!: string;

  @Field(() => String)
  url!: string;

  @Field(() => Int, { description: 'Display order; lower comes first.' })
  position!: number;
}
