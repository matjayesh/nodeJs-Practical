export class Tables {
  public static readonly USER = "users";
  public static readonly TOPICS = "topics";
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
