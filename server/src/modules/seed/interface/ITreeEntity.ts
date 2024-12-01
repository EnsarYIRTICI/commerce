import { IStaticEntity } from './IStaticEntity';

export interface ITreeEntity extends IStaticEntity {
  children: ITreeEntity[];
  parent: ITreeEntity | null;
}
