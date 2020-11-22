import { AlarmService } from './../alarm.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { DatePipe } from '@angular/common';


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


  constructor(private service: AlarmService, private datepipe: DatePipe) {}

  ngOnInit() {
    this.filterForm = new FormGroup({
      status: new FormControl(''),
      severity: new FormControl(''),
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
      currentPage: new FormControl('1'),
      pageSize: new FormControl('5')
    });

    this.applyFilter();
  }

  applyFilter(){
    let queryString: string= this.buildQueryString();
    this.service.getAlarmCollection(queryString).subscribe(res => {
      this.alarmsCollection = res['alarms'];
       this.alarmsCollection.sort((a, b) => {
        return <any>new Date(b.creationTime) - <any>new Date(a.creationTime);
      });
      this.total = res['statistics']['count'];
      this.totalPages = res['statistics']['totalPages'];
    });

  }
   
  clearFilter(){
    this.filterForm.get('status').setValue('');
    this.filterForm.get('severity').setValue('');
    this.filterForm.get('dateTo').setValue('');
    this.filterForm.get('dateFrom').setValue('');
  }

  buildQueryString(): string{
    let queryString = '';
    if(this.filterForm.get('severity').value !== ''){
      queryString +='severity='+this.filterForm.get('severity').value+'&';
    }
    if(this.filterForm.get('status').value !== ''){
      queryString +='status='+this.filterForm.get('status').value+'&';
    }
    if(this.filterForm.get('dateTo').value !== ''){
      let desiredDateTo = this.getDateString(this.filterForm.get('dateTo').value)
      queryString+='dateTo='+desiredDateTo+'&';
    }
    if(this.filterForm.get('dateFrom').value !== ''){
      let desiredDateFrom = this.getDateString(this.filterForm.get('dateFrom').value)
      queryString+='dateFrom='+desiredDateFrom+'&';
    }
    queryString +='pageSize='+this.filterForm.get('pageSize').value+'&currentPage='+this.filterForm.get('currentPage').value+'&withTotalPages=true';
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
   getDateString(dateString: string): string{
     let desiredDateString: string='';
     let date =new Date(dateString);
     desiredDateString =this.datepipe.transform(date,'yyyy-MM-ddTHH:mm:ss.SSS');
     desiredDateString+='Z';
     return desiredDateString;
   }

   search(){
     this.filterForm.get('currentPage').setValue('1');
     this.applyFilter();
   }
}
