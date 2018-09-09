import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.less'],
})
export class TraineeComponent implements OnInit {
  q: any = {
    ps: 8,
    categories: [],
    owners: ['zxx'],
  };

  list: any[] = [];

  loading = true;

  // region: cateogry
  categories = [
    { id: 0, text: 'Registered', value: false },
    { id: 1, text: 'Cancelled', value: false },
    { id: 2, text: 'Pending Feedback', value: false },
    { id: 3, text: 'Completed', value: false },
  ];

  changeCategory(status: boolean, idx: number) {
    // this.categories.map(i => (i.value = status));
    this.categories[idx].value = status;
    this.getData();
  }
  // endregion

  constructor(private http: _HttpClient, public msg: NzMessageService) {}

  ngOnInit() {
    this.getData();
  }

  // getData() {
  //   this.loading = true;
  //   this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
  //     this.list = res;
  //     this.loading = false;
  //   });
  // }

  getData() {
    this.loading = true;
    this.http.post('training/history', { 'traineeId': '5000001' }, {}, {headers: {'Content-Type': 'application/json', 'token': 'testtoken'}}).subscribe((res: any) => {
      this.list = res.trainingHistoryDetails;
      this.loading = false;
    });
  }
}
