import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { emit } from 'process';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closer = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  closeSidenav() {
    this.closer.emit();
  }

}
