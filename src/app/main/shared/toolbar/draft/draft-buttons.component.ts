import { Component } from '@angular/core';
import { ArticleDataService } from '../../../../core/services/data/article-data.service';
import { IPopup, SuiModalService } from 'ng2-semantic-ui';
import { ConfirmModal } from '../../../../shared/confirmModal/cofirm-modal';
import { Article } from 'app/core/models/article';
import { ARTICLE_STATUS } from '../../../../core/models/article';
import { MainService } from 'app/main/main.service';
import { PopupUtils } from '../../../../core/base/services/utils/popup-utils';
import { Tag } from '../../../../core/models/tag';

@Component({
  selector: 'draft-buttons',
  templateUrl: './draft-buttons.component.html'
})
export class DraftButtonsComponent {

  public isCreating: boolean = false;
  public isDeleting: boolean = false;
  public isMoving: boolean = false;

  constructor(public dataService: ArticleDataService,
              public modalService: SuiModalService,
              public mainService: MainService) {
  }

  public onAdd(popup: IPopup) {
    let article = new Article();
    article.title = '标题' + this.dataService.getUnProcessList().length;
    article.status = ARTICLE_STATUS.DRAFT;
    let filter = this.dataService.getFilter();
    if (filter && filter.method === 'tag') {
      article.tags.push(new Tag(filter.value));
    }

    this.dataService.createItem(article, () => {
      this.isCreating = true;
    }, () => {
      PopupUtils.openForWhile(popup);
      this.isCreating = false;
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
        this.dataService.deleteItem(this.dataService.getSelected(), () => {
          this.isDeleting = true;
        }, () => {
          this.isDeleting = false;
          this.dataService.setSelected(null);
        });
      });
  }

  public moveToPost(popup: IPopup): void {
    if (!this.dataService.getSelected()) {
      PopupUtils.openForWhile(popup);
      return;
    }
    let article = this.dataService.getSelected();
    article.status = ARTICLE_STATUS.POST;
    this.dataService.updateItem(article, () => {
      this.isMoving = true;
    }, () => {
      this.isMoving = false;
    });
  }

}
