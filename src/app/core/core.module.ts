import { NgModule } from '@angular/core';
import { ArticleDataService } from './services/data/article-data.service';
import { WindowService } from './services/windowService';
import { ArticleContentProcessor } from './services/content/article-content-processor';

@NgModule({
  providers: [
    {provide: 'DataService<Article>', useClass: ArticleDataService},
    {provide: 'ArticleContentProcessor', useClass: ArticleContentProcessor},
    {provide: 'WindowService', useClass: WindowService}
  ]
})

export class CoreModule {

}
