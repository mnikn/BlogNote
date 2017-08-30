import { Component, OnInit } from '@angular/core';
import { Article, ARTICLE_STATUS } from '../../../core/models/article';
import { Filter } from 'app/core/models/filter';
import { Context } from '../../../core/services/context';
import { IPopup, SuiModalService } from 'ng2-semantic-ui';
import { ConfirmModal } from '../../../shared/confirmModal/cofirm-modal';
import { setTimeout } from 'timers';
import { ArticleDataService } from '../../../core/services/data/article-data.service';
import { ActivatedRoute, Router } from '@angular/router';
declare let electron: any;

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html'
})

export class ToolbarComponent implements OnInit{

  private selectStatus: ARTICLE_STATUS;

  constructor(public dataService: ArticleDataService,
              public modalService: SuiModalService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.route.paramMap.forEach((params) => {
      this.selectStatus = Number(params.get('status'));
    });
  }

  // public onAdd() {
  //   let article = new Article();
  //   article.status = this.selectStatus;
  //   this.dataService.createItem(article);
  // }
  //
  // public onDelete(popup: IPopup) {
  //   if (!this.dataService.getSelected()) {
  //     popup.open();
  //     setTimeout(() => {
  //       popup.close();
  //     }, 1000);
  //     return;
  //   }
  //
  //   this.modalService
  //     .open(new ConfirmModal('确定要删除笔记吗？'))
  //     .onApprove(() => {
  //       this.dataService.deleteItem(this.dataService.getSelected());
  //       this.dataService.setSelected(null);
  //     });
  // }
  //
  // public onRefresh() {
  //   this.dataService.refresh();
  // }

  // public onDeploy() {
  //   this.isDeploying = true;
  //   let dir = Context.config.blogRoot.replace(' ', '\\ ');
  //   let command = 'cd ' + dir + ' && hexo g && hexo d';
  //   electron.remote.require('child_process').exec(command, (error, stdout, stderr) => {
  //     console.log(error);
  //     console.log(stdout);
  //     console.log(stderr);
  //   });
  //
  //   // deleteItem later
  //   setTimeout(() => {
  //     this.isDeploying = false;
  //   }, 10000);
  // }

  public onEdit() {
    this.router.navigate(['/edit', this.dataService.getSelected().id]);
  }

  public onSearchEnter(value) {
    this.dataService.setFilter(new Filter('blur', value));
  }
}
