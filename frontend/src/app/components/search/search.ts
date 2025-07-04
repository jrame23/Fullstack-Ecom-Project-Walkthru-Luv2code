import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  doSearch(value: string) {
    console.log(`value= ${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

}
