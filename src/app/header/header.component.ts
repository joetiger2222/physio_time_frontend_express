import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
ngOnInit() {
  const data=0;
  console.log(`ngOnInit ~ data:`, data)
 
}
}
