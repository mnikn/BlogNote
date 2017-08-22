import { Component, Inject, Input } from '@angular/core';
import { DataService } from '../../core/base/interfaces/data-service';
import { Article } from '../../core/models/article';
import { WindowService } from '../../core/services/window.service';

@Component({
  selector: 'note-preview',
  templateUrl: './note-preview.component.html'
})

export class NotePreviewComponent {

  @Input() public showInfo: boolean = true;

  constructor(public windowService: WindowService,
              @Inject('DataService<Article>') public dataService: DataService<Article>) {
  }

}
