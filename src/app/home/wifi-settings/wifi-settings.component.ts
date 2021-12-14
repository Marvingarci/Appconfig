import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wifi-settings',
  templateUrl: './wifi-settings.component.html',
  styleUrls: ['./wifi-settings.component.scss']
})
export class WifiSettingsComponent implements OnInit {
  selectedRowIds: Set<number> = new Set<number>();

  allRows: any[] = [
    {id: 1, nom: 'A', prenom: 'X'},
    {id: 2, nom: 'B', prenom: 'Y'},
    {id: 3, nom: 'C', prenom: 'Z'},
  ];

  selectedId!: string;

  onRowClick(id: number) {
    if(this.selectedRowIds.has(id)) {
     this.selectedRowIds.delete(id);
    }
    else {
      this.selectedRowIds.add(id);
    }
  }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows(){
    return this.allRows.filter(x => this.selectedRowIds.has(x.id));
  }

  onLogClick() {
    console.log(this.getSelectedRows());
  }
  constructor() { }

  ngOnInit(): void {
  }

}
