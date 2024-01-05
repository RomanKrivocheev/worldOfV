import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field()
  id!: number;

  @Field()
  name!: string;

  @Field()
  price!: number;

  @Field()
  duration!: number;

  @Field()
  genre!: string;
}

@InputType()
export class GetTracksInput {
  @Field()
  artistName!: string;

  @Field()
  genreName!: string;

  @Field()
  minPrice!: number;

  @Field()
  maxPrice!: number;

  @Field()
  page!: number;

  @Field()
  pageSize!: number;
}
