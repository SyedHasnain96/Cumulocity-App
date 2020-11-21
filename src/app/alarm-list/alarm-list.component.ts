import { AlarmService } from './../alarm.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { stringify } from 'querystring';


@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.css']
})
export class AlarmListComponent implements OnInit {

  filterForm: FormGroup | undefined;
  alarmsCollection: any = [];
  total: any;
  totalPages: any;
  filter = false;


  constructor(private service: AlarmService) {}

  ngOnInit() {
    this.filterForm = new FormGroup({
      status: new FormControl(''),
      severity: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      currentPage: new FormControl('1'),
      pageSize: new FormControl('5')
    });
    this.applyFilter();
  }

  applyFilter(){
    let queryString: string= this.buildQueryString();

    this.service.getAlarmCollection(queryString).subscribe(res => {
      this.alarmsCollection = res['alarms'];
      this.total = res['statistics']['count'];
      this.totalPages = res['statistics']['totalPages'];
    });

  }

  buildQueryString(): string{
    let queryString = '';
    if(this.filterForm.get('severity').value !== ''){
      queryString +='severity='+this.filterForm.get('severity').value+'&';
    }
    if(this.filterForm.get('status').value !== ''){
      queryString +='status='+this.filterForm.get('status').value+'&';
    }
    queryString += 'pageSize='+this.filterForm.get('pageSize').value+'&currentPage='+this.filterForm.get('currentPage').value;
    return queryString;
  }

  getPage(num){
  let newPageNum: number = +this.filterForm.get('currentPage').value+num;
  this.filterForm.get('currentPage').setValue(newPageNum);
  this.applyFilter();
  }

  updatePageSize(): void{
    this.filterForm.get('currentPage').setValue('1');
    this.applyFilter(); 
  }
  previousDisable(): boolean{
    return this.filterForm.get('currentPage').value == 1   
   }
 
   nextDisable(): boolean{
     return this.filterForm.get('currentPage').value == this.totalPages
   }
}
