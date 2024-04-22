import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoiService } from 'src/app/services/foi-service/foi.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';

@Component({
  selector: 'app-fio-document-list',
  templateUrl: './fio-document-list.component.html',
  styleUrls: ['./fio-document-list.component.scss']
})
export class FioDocumentListComponent {

  showLoader: boolean = false;
  FOIList: any = [];

  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  dateDifference: any

  constructor(
    private foiService: FoiService,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFOIList();
  }

  
  formatMilliseconds(milliseconds: number): string {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return `${days} days`;
  }


  getFOIList() {
    this.showLoader = true;
    let params = {
      keyword: ''
    }
    this.projectService.getProjectList(params).subscribe((response) => {
      this.FOIList = [];
      this.totalRecords = 0;
      if (response?.status == true) {
        this.showLoader = false;
        this.FOIList = response?.data;
        this.FOIList.forEach((project: any) => {
          const dueDate = new Date(project.dueDate);
          const currentDate = new Date();
          const dateDifference = Math.abs(dueDate.getTime() - currentDate.getTime());
          console.log(`Date difference for project ${dateDifference}`);
          const formattedDateDifference: string = this.formatMilliseconds(dateDifference);
          this.dateDifference = formattedDateDifference;
        });
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

  foiDetails(item: any) {
    localStorage.setItem("foiID", item?._id);
    this.router.navigate(['/boss-user/foi-document-details'], { queryParams: { id: item?._id } });
  }


}
