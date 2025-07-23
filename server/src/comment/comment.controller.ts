import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentService } from './comment.service';
import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from 'src/dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async addComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req,
  ) {
    const user = req.user.userId;
    return this.CommentService.create(user, postId, dto);
  }

  @Get(':postId')
  async getComments(@Param('postId') postId: string) {
    return this.CommentService.getCommentsByPost(postId);
  }

    @Get(':postId/count')
  async countComments(@Param('postId') postId: string) {
    return this.CommentService.countCommentsByPost(postId);
  }
}
