import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Folder {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [String], default: [] })
  files: string[];
}

export type FolderDocument = Folder & Document;
export const FolderSchema = SchemaFactory.createForClass(Folder);
