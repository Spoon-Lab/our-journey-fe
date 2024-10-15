export interface CommentsData {
  list: {
    content: Comment[];
  };
}
export interface CommentProfileDto {
  nickname: string;
  profileId: number;
  profileImage: string;
}
export interface Comment {
  commendId: number;
  commentProfileDto: CommentProfileDto;
  content: string;
  createdAt: string;
}
