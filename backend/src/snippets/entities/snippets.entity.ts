import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('snippets')
export class Snippet {
  @PrimaryColumn({ length: 21 })
  id: string;

  @Column('text')
  code: string;

  @Column({ length: 50 })
  language: string;

  @Column({ length: 50 })
  theme: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
