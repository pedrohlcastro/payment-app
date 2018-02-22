import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  history;
  value = 0;

  constructor(private ts: TransactionService) { }

  ngOnInit() {
    this.ts.getStatement().subscribe((res) => {
      this.history = res;
      this.ts.getBalance().subscribe((data) => {
        this.value = data;
        console.log(data);
      });
    });
  }

}
