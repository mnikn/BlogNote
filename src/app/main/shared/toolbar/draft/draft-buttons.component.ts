import { Component } from '@angular/core';
import { ArticleDataService } from '../../../../core/services/data/article-data.service';
import { IPopup, SuiModalService } from 'ng2-semantic-ui';
import { ConfirmModal } from '../../../../shared/confirmModal/cofirm-modal';
import { Article } from 'app/core/models/article';
import { ARTICLE_STATUS } from '../../../../core/models/article';
import { MainService } from 'app/main/main.service';
import { PopupUtils } from '../../../../core/base/services/utils/popup-utils';

@Component({
  selector: 'draft-buttons',
  templateUrl: './draft-buttons.component.html'
})
export class DraftButtonsComponent {

  constructor(public dataService: ArticleDataService,
              public modalService: SuiModalService,
              public mainService: MainService) {
  }

  public onAdd(popup: IPopup) {
    let article = new Article();
    article.title = '标题' + this.dataService.getUnProcessList().length;
    article.status = ARTICLE_STATUS.DRAFT;
    this.dataService.createItem(article, () => {
      PopupUtils.openForWhile(popup);
    });
  }

  public onDelete(popup: IPopup) {
    if (!this.dataService.getSelected()) {
      PopupUtils.openForWhile(popup);
      return;
    }

    this.modalService
      .open(new ConfirmModal('确定要删除笔记吗？'))
      .onApprove(() => {
        this.dataService.deleteItem(this.dataService.getSelected(),() => {
          this.dataService.setSelected(null);
        });
      });
  }

  public onRefresh() {
    this.dataService.refresh();
  }

  public moveToPost(popup: IPopup): void {
    if (!this.dataService.getSelected()) {
      popup.open();
      setTimeout(() => {
        popup.close();
      }, 1000);
      return;
    }
    let article = this.dataService.getSelected();
    this.dataService.deleteItem(article);
    article.status = ARTICLE_STATUS.POST;
    this.dataService.createItem(article);
    this.dataService.setSelected(null);
  }

}
