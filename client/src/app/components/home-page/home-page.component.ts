import { NotificationsService } from 'angular2-notifications';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  customers;
  value;

  constructor(private ts: TransactionService, private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.ts.getUsers().subscribe((res) => {
      this.customers = res;
      console.log(this.customers);
    });
  }

  sendMoney(index) {
    this.ts.sendMoney(this.customers[index].id, this.value)
      .subscribe((res) => {
        this.notificationsService.success('Enviado com Sucesso', 'Clique Para fechar');
      }, (err) => {
        this.notificationsService.warn('Algo deu errado...', 'TenteNovamente');
      });
    this.ts.sendMoneyToBlockChain(this.customers[index], this.value).subscribe((res) => {
      this.notificationsService.success('Enviado com Sucesso BlockChain', 'Clique Para fechar');
    });
    this.value = '';
  }
}
