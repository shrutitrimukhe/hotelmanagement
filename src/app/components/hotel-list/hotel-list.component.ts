import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotels?: Hotel[];
  currentHotel: Hotel = {
    name: undefined,
    description: undefined
  };
  currentIndex = -1;
  name = '';

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.retrieveHotels();
  }

  retrieveHotels(): void {
    this.hotelService.getAll()
      .subscribe({
        next: (data: Hotel[] | undefined) => {
          this.hotels = data;
          console.log(data);
        },
        error: (e: any) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveHotels();
    this.currentHotel = {};
    this.currentIndex = -1;
  }

  setActiveHotel(hotel: Hotel, index: number): void {
    this.currentHotel = hotel;
    this.currentIndex = index;
  }

  removeAllHotels(): void {
    this.hotelService.delete()
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.refreshList();
        },
        error: (e: any) => console.error(e)
      });
  }

  searchName(): void {
    this.currentHotel = {};
    this.currentIndex = -1;

    this.hotelService.findByName(this.name)
      .subscribe({
        next: (data: Hotel[] | undefined) => {
          this.hotels = data;
          console.log(data);
        },
        error: (e: any) => console.error(e)
      });
  }

}

