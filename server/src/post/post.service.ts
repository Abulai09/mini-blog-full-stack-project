import { CreatePostDto } from './../dto/post.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.model';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(CreatePostDto: CreatePostDto, userId: string) {
    const createdPost = new this.postModel({
      ...CreatePostDto,
      author: new mongoose.Types.ObjectId(userId),
    });
    await createdPost.save();
    return { mesaage: 'Created', createdPost };
  }

async toggleLike(postId: string, userId: string) {
  try {
    console.log('postId:', postId);
    console.log('userId:', userId);

    const post = await this.postModel.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const index = post.likes.findIndex(
      (id) => id.toString() === userObjectId.toString()
    );

    if (index >= 0) {
      post.likes.splice(index, 1);
    } else {
      post.likes.push(userObjectId);
    }

    await post.save();

    return {
      postId: post._id,
      likeCount: post.likes.length,
      likedByUser: index === -1,
    };

  } catch (error) {
    console.error('toggleLike error:', error);
    throw error;
  }
}



  // post.service.ts
  async findAll() {
    const posts = await this.postModel
      .find()
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username email' },
      })
      .populate({
        path: 'author',
        model: 'User',
        select: 'username',
      })
      .sort({ createdAt: -1 })
      .exec();

    
    return posts;
  }

  async findByAuthor(userId: string) {
    return this.postModel.find({ author: userId });
  }
}
