import { Component } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';


@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})

export class AddHotelComponent {

  hotel: Hotel = {
    name: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private hotelService: HotelService) { }

  saveHotel(): void {
    const data = {
      name: this.hotel.name,
      description: this.hotel.description
    };

    this.hotelService.create(data)
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e: any) => console.error(e)
    });
  }

  newHotel(): void {
    this.submitted = false;
    this.hotel = {
      name: '',
      description: '',
    published: false
   
  };
  }
}
