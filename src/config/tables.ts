export class Tables {
  public static readonly USER = "users";
  public static readonly TOPICS = "topics";
  public static readonly POSTS = "posts";
  public static readonly UPLOADS = "uploads";
  public static readonly COMMENTS = "comments";
  public static readonly PROPERTY = "properties";
  public static readonly PROPERTY_IMAGE = "propertyImages";
  public static readonly FAVORITE_PROPERTY = "favorites";
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

export enum PropertyTable {
  ID = "id",
  NAME = "name",
  USER_ID = "userId",
  DESCRIPTION = "description",
  ADDRESS = "address",
  LOCALITY = "locality",
  PRICE = "price",
  BEDROOM = "bedroom",
  BATH = "bath",
  AREAUNIT = "areaUnit",
  CARPETAREA = "carpetArea",
  AREASQFT = "areaSqFt",
  AREAYARD = "areaSqYd",
  AREAMETER = "areaSqMt",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export enum PropertyImageTable {
  ID = "id",
  PROPERTY_ID = "propertyId",
  IMAGE = "image",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export enum FavoriteTable {
  ID = "id",
  PROPERTY_ID = "propertyId",
  USER_ID = "userId",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}
