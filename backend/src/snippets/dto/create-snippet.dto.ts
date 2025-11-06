import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(102400) // 100KB
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  language: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  theme: string;
}
