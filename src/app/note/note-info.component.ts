import { Component, Inject } from '@angular/core';
import { DataService } from '../core/services/data/interface/data-service';
import { Article } from '../core/models/article';

@Component({
  selector: 'note-info',
  templateUrl: './note-info.component.html'
})

export class NoteInfoComponent {

  constructor(@Inject('DataService<Article>') public dataService: DataService<Article>) {
  }
}
