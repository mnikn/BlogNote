import { IDataPager } from './data-pager';
import { DataOption } from '../../params/data-option';
import { Filter } from '../../../models/filter';

export interface IDataService<T> {
  refresh(): void;
  getFilter(): Filter;
  setFilter(filter: Filter): void;
  setDataOption(option: DataOption): void;
  getDataOption(): DataOption;
  getList(): T[];
  getUnProcessList(): T[];
  add(item: T): number;
  update(item: T): boolean;
  remove(item: T): boolean;
  getPagerService(): IDataPager<T>;
  getSelected(): T;
  setSelected(data: T);
}
