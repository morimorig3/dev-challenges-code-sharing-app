import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Snippet } from './entities/snippets.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { CreateSnippetDto } from './dto';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(Snippet)
    private snippetRepository: Repository<Snippet>,
  ) {}

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetRepository.findOne({
      where: { id },
    });
    if (!snippet) {
      throw new NotFoundException('スニペットが見つかりません。');
    }
    return snippet;
  }

  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const id = nanoid(21);

    const snippet = this.snippetRepository.create({
      id,
      ...createSnippetDto,
    });

    return await this.snippetRepository.save(snippet);
  }
}
