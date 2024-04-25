import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: ['./mode-selector.component.css']
})
export class ModeSelectorComponent {

  mode: string;
  role: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  setMode(mode: string) {
    this.mode = mode;
  }
  setRole(role: string) {
    this.role = role;
    this.navigateToPage();
  }

  navigateToPage() {
    this.router.navigate([this.mode + "/" + this.role], { relativeTo: this.route });
  }
}
