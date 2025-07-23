import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostService } from './post.service';
import { Body, Controller, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { CreatePostDto } from 'src/dto/post.dto';

@Controller('post')
export class PostController {

    constructor(private readonly postService:PostService){}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
        destination: './uploads/posts',
        filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${uniqueSuffix}${ext}`);
        },
        }),
    }))
    @Post('create')
    async create( @Body()  createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File,
    @Request() req, ){
        const imagePath = file ? `/uploads/posts/${file.filename}` : null;
        const user = req.user.userId
        return this.postService.create({
            ...createPostDto,imageUrl:imagePath},user)
    }

    @Post(':id')
    @UseGuards(JwtAuthGuard)
    async toggleLike(@Param('id') postId: string, @Request() req){
        const userId = req.user.userId;
        return this.postService.toggleLike(postId, userId);
    }

    @Get('getAll')
    async findAll(){
        return await this.postService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async findMyPosts(@Request() req) {
        return await this.postService.findByAuthor(req.user.userId);
    }
}
