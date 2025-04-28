import { IStatic } from "./IStatic";

export interface ITree extends IStatic {
  children: ITree[];
  parent: ITree | null;
}
