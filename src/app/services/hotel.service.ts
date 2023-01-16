import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/hotels';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  findByName(name: string) {
    throw new Error('Method not implemented.');
  }
  getAll() {
    throw new Error('Method not implemented.');
  }
  delete(id: any) {
    throw new Error('Method not implemented.');
  }
  update(id: any, data: { name: any; description: any; published: boolean; }) {
    throw new Error('Method not implemented.');
  }
  get(id: string) {
    throw new Error('Method not implemented.');
  }
  create(data: { name: any; description: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
