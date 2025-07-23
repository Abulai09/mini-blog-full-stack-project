import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.model';
import { Post, PostSchema } from 'src/post/post.model';
import { User, UserSchema } from 'src/user/user.model';

@Module({
  imports:[ MongooseModule.forFeature( [
    {name:Comment.name, schema:CommentSchema} ,
    { name: Post.name, schema: PostSchema },
    { name: User.name, schema: UserSchema },
  ] ) ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
