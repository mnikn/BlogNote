import { IDataService } from '../interfaces/data/data-service';
import { Inject, Injectable } from '@angular/core';
import { Filter } from '../../models/filter';
import { DataOption } from '../params/data-option';
import { IDataPager } from '../interfaces/data/data-pager';
import { IDataResource } from '../interfaces/data/data-resource';
import { IResourceProcessor } from '../interfaces/data/resource-processor';
import { IIdentifiable } from '../interfaces/models/identifiable';

@Injectable()
export class DataService<T extends IIdentifiable> implements IDataService<T> {
  protected selectedItem: T;
  private dataModifyCallback: () => any;
  private processMethodChangeCallback: () => any;

  constructor(protected dataResourceService: IDataResource<T>) {
  }

  public refresh(afterCallback?: () => any): void {
    this.dataResourceService.refresh();
    if (afterCallback) {
      afterCallback();
    }
    this.dataModifyCallback();
  }

  public getFilter(): Filter {
    return this.dataResourceService.getFilter();
  }

  public setFilter(filter: Filter): void {
    this.dataResourceService.setFilter(filter);
    this.processMethodChangeCallback();
  }

  public setDataOption(option: DataOption): void {
    this.dataResourceService.setDataOption(option);
    this.processMethodChangeCallback();
  }

  public getDataOption(): DataOption {
    return this.dataResourceService.getDataOption();
  }

  public getItem(id: number): T {
    return this.dataResourceService.getItem(id);
  }

  public getList(): T[] {
    return this.dataResourceService.getList();
  }

  public getUnProcessList(): T[] {
    return this.dataResourceService.getUnProcessList();
  }

  public createItem(item: T, successCallback?: () => any): number {
    let successful = this.dataResourceService.add(item);
    if (successful) {
      if (successCallback) {
        successCallback();
      }
      this.dataModifyCallback();
    }
    return successful;
  }

  public updateItem(item: T, successCallback?: () => any): boolean {
    let successful = this.dataResourceService.update(item);
    if (successful) {
      if (this.selectedItem.id === item.id) {
        this.selectedItem = item;
      }
      if (successCallback) {
        successCallback();
      }
      this.dataModifyCallback();
    }
    return successful;
  }

  public deleteItem(item: T, successCallback?: () => any): boolean {
    let successful = this.dataResourceService.remove(item);
    if (successful) {
      if (successCallback) {
        successCallback();
      }
      this.dataModifyCallback();
    }
    return successful;
  }

  public getPagerService(): IDataPager<T> {
    return this.dataResourceService.getPagerService();
  }

  public getSelected(): T {
    return this.selectedItem;
  }

  public setSelected(id: number) {
    this.selectedItem = this.dataResourceService.getItem(id);
  }

  public registerResourceProcessor(resourceProcessor: IResourceProcessor<T>): void {
    this.dataResourceService.registerResourceProcessor(resourceProcessor);
  }

  public onDataModify(callback: () => any): void {
    this.dataModifyCallback = callback;
  }

  public onProcessMethodChange(callback: () => any): void {
    this.processMethodChangeCallback = callback;
  }

}
