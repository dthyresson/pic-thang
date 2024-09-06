import type { GraphQLResolveInfo } from "graphql";

import type { RedwoodGraphQLContext } from "@redwoodjs/graphql-server/dist/types";

import type { Pic as RTPic } from "./shared-return-types";
import type { CreatePicInput, UpdatePicInput, Query, Mutation } from "./shared-schema-types";

/** SDL: pics: [Pic!]! */
export interface PicsResolver {
    (args?: object, obj?: { root: Query, context: RedwoodGraphQLContext, info: GraphQLResolveInfo }): Promise<RTPic[]>;
}

/** SDL: pic(id: String!): Pic */
export interface PicResolver {
    (args: {id: string}, obj?: { root: Query, context: RedwoodGraphQLContext, info: GraphQLResolveInfo }): Promise<RTPic| null>;
}

/** SDL: createPic(input: CreatePicInput!): Pic! */
export interface CreatePicResolver {
    (args: {input: CreatePicInput}, obj?: { root: Mutation, context: RedwoodGraphQLContext, info: GraphQLResolveInfo }): Promise<RTPic>;
}

/** SDL: updatePic(id: String!, input: UpdatePicInput!): Pic! */
export interface UpdatePicResolver {
    (args: {id: string, input: UpdatePicInput}, obj?: { root: Mutation, context: RedwoodGraphQLContext, info: GraphQLResolveInfo }): Promise<RTPic>;
}

/** SDL: deletePic(id: String!): Pic! */
export interface DeletePicResolver {
    (args: {id: string}, obj?: { root: Mutation, context: RedwoodGraphQLContext, info: GraphQLResolveInfo }): Promise<RTPic>;
}
