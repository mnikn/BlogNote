import { NgModule } from '@angular/core';
import { MockArticleDataService } from './services/mock-article-data.service';

@NgModule({
  providers: [
    {provide: 'ArticleDataManager', useClass: MockArticleDataService}
  ]
})

export class CoreModule {

}