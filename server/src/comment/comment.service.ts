import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.model';
import { Model, Types } from 'mongoose';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { Post } from 'src/post/post.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
      @InjectModel(Post.name) private postModel: Model<Post>,

  ) {}

  async create(userId: string, postId: string, dto: CreateCommentDto) {
    const newComment = await this.commentModel.create({
      user: new Types.ObjectId(userId),
      post: new Types.ObjectId(postId),
      text: dto.text,
    });

    await this.postModel.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    return newComment;
  }

  async getCommentsByPost(postId: string) {
    return this.commentModel
      .find({ post: postId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
  }

  async countCommentsByPost(postId: string) {
    return this.commentModel.countDocuments({ post: postId });
  }
}
