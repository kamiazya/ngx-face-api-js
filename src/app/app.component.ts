import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imageSrc = '/assets/sample1.jpg';

  selectFile(event: any) {
    const file = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (e: any) => (this.imageSrc = e.target.result);
    reader.readAsDataURL(file);
  }
}
