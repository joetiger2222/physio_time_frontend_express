import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  arr = [
    // '../../assets/11.jpeg',
    '../../assets/6.png',
    '../../assets/3.jpeg',
    '../../assets/4.jpeg',
    '../../assets/2.jpeg',
    '../../assets/7.jpeg',
    '../../assets/5.jpeg',
  ];
  
  currentIndex = 0;
  currentImage: string='';

   ngOnInit()  {
    // Initialize the current image
    this.currentImage = this.arr[this.currentIndex];
    
    // Change the image every 2 seconds
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.arr.length;
      this.currentImage = this.arr[this.currentIndex];
    }, 2000);
    
  }
}
