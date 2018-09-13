import { StudentService } from './../../services/student.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Student } from '../../models/student.model';
export interface Result {
  status: number;
  error: any;
  data: any;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  displayedColumns = ['sid', 'name', 'phone', 'class', 'rollnumber', 'status'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  students = [];
  constructor(private studenService: StudentService) {

      this.studenService.getStudentList().then((result: Result) => {
        console.log(result.data);
        result.data.forEach(element => {
          const row = {
            sid: element.sid,
            name: element.name,
            phone: element.phone,
            class: element.classname + ' ' + element.section,
            rollnumber: element.rollnumber,
            status: element.status
          };
          this.students.push(row);
        });
        this.dataSource = new MatTableDataSource(this.students);
      }).then(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
   }

  ngOnInit() {
    localStorage.setItem('pagetitle', 'Students');
    localStorage.setItem('pagesubtitle', '');
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
