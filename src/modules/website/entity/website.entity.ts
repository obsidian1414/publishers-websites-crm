import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Publisher } from '../../publisher/entity/publisher.entity';

@Entity('website')
export class Website {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', name: 'publisher_id' })
  publisherId!: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.websites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'publisher_id' })
  publisher!: Publisher;

  @Column({ type: 'varchar' })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
