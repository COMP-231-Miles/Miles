import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  collection: any[] = [];
  page = 1;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  handlePageChange(event: any): void {
    this.page = event;
  }

  goToAdd() {
    this.router.navigate(['/car-list/add'], { relativeTo: this.route });
  }
}
