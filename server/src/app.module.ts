import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot(`mongodb://localhost:27017/blog-app`) ,AuthModule, UserModule, PostModule, CommentModule, LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//mongodb://localhost:27017