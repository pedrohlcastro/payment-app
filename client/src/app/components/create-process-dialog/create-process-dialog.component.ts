import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-process-dialog',
  templateUrl: './create-process-dialog.component.html',
  styleUrls: ['./create-process-dialog.component.scss']
})
export class CreateProcessDialogComponent implements OnInit {

  processName;
  enterpriseID;
  newProcess;
  public editForm: FormGroup;
  selectStatus;
  selectPhase;
  processId;
  process;
  processEditControl;
  statusProcess = [
    {value: 'PRODUCAO', viewValue: 'Produção'},
    {value: 'PROTOCOLADO', viewValue: 'Protocolado'},
    {value: 'EM ANALISE', viewValue: 'Em Analise'},
    {value: 'DEFERIDO', viewValue: 'Deferido'},
    {value: 'INDEFERIDO', viewValue: 'Indeferido'}
  ];

  phaseProcess = [
    {value: 'LP', viewValue: 'LP'},
    {value: 'LI', viewValue: 'LI'},
    {value: 'LO', viewValue: 'LO'},
    {value: 'LOC', viewValue: 'LOC'}
  ];

  constructor(
    public dialogRef: MdDialogRef<CreateProcessDialogComponent>,
    @Inject(MD_DIALOG_DATA) public dataReceive: any,
  ) {
    if (dataReceive.processId) {
      this.processId = dataReceive.processId;
    } else {
      this.enterpriseID = dataReceive;
    }
  }

  ngOnInit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
