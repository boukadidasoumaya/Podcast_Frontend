import { Component, EventEmitter, input, Output, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
   searchTerm: string = '';
   suggestions: string[] = [];
   private searchSubject = new Subject<string>();
   showsuggestions: boolean = false;
   suggselected: boolean = false;

  constructor() {}
ngOnInit() {
  this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) => this.getSuggestions(term))
  ).subscribe((results) => {
    this.suggestions = results;
  });
}

  // Emit search events to the parent
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(): void {
    this.searchEvent.emit(this.searchTerm);
    this.showsuggestions = false;
  }
onInputChange() {
  this.searchSubject.next(this.searchTerm); // Emit the search term
  this.showsuggestions = true;

}
onBlur() {
  if(this.suggselected==true || this.searchTerm == '') {
    this.showsuggestions = false;
  }
}


onSuggestionClick(suggestion: string) {
  this.suggselected = true;
  this.searchTerm = suggestion;
  this.onSearch();
  this.showsuggestions = false;
  this.suggselected = false;
}

private getSuggestions(term: string): Promise<string[]> {
  const suggestions = ['podcast1', 'pod2', 'podcast3', 'podc4', 'pod5'];//liste des podcast from db: fetch from API(httpclient)
  return new Promise((resolve) => {
    const filtered = suggestions.filter((s) =>
      s.toLowerCase().includes(term.toLowerCase())
    );
    resolve(filtered);
  });
}

}

