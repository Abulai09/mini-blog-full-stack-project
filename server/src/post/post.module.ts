import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.model';
import { Comment, CommentSchema } from 'src/comment/comment.model'; // ✅ импорт
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema }, // ✅ регистрация Comment
    ]),
    AuthModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
