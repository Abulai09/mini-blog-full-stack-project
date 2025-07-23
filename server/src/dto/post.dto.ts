// dto/create-post.dto.ts
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  content: string;

  @IsOptional()
  @IsString()
  imageUrl?: string | null; // можно передавать ссылку на файл, если используешь frontend
}
