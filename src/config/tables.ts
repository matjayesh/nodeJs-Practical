export class Tables {
  public static readonly USER = "users";
  public static readonly TOPICS = "topics";
  public static readonly POSTS = "posts";
  public static readonly UPLOADS = "uploads";
  public static readonly COMMENTS = "comments";
}

export enum UserTable {
  ID = "id",
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export enum TopicsTable {
  ID = "id",
  TITLE = "title",
  USER_ID = "userId",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export enum PostsTable {
  ID = "id",
  TOPIC_ID = "topicId",
  TITLE = "title",
  DESCRIPTION = "description",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export enum UploadTable {
  ID = "id",
  POST_ID = "postId",
  IMAGE = "image",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export enum CommentTable {
  ID = "id",
  POST_ID = "postId",
  USER_ID = "userId",
  COMMENT = "comment",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}
