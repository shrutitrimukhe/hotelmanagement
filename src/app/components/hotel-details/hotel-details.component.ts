import { Component, Input, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentHotel: Hotel = {
    name: '',
    description: '',
    published: false
  };
  
  message = '';
  currenthotel: any;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getHotel(this.route.snapshot.params["id"]);
    }
  }

  getHotel(id: string): void {
    this.hotelService.get(id)
      .subscribe({
        next: (data: any) => {
          this.currentHotel = data;
          console.log(data);
        },
        error: (e: any) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentHotel.name,
      description: this.currentHotel.description,
      published: status
    };

    this.message = '';

    this.hotelService.update(this.currentHotel.id, data)
      .subscribe({
        next: (res: { message: string; }) => {
          console.log(res);
          this.currentHotel.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e: any) => console.error(e)
      });
  }

  updateHotel(): void {
    this.message = '';

    this.hotelService.update(this.currenthotel.id, this.currentHotel)
      .subscribe({
        next: (res: { message: string; }) => {
          console.log(res);
          this.message = res.message ? res.message : 'This hotel was updated successfully!';
        },
        error: (e: any) => console.error(e)
      });
  }

  deleteHotel(): void {
    this.hotelService.delete(this.currentHotel.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['/hotels']);
        },
        error: (e: any) => console.error(e)
      });
  }

}
