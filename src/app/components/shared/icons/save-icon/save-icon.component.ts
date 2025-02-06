import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core'
import { BookmarkService } from '../../../../services/bookmark.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { throwError } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-save-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-icon.component.html',
  styleUrl: './save-icon.component.css'
})
export class SaveIconComponent implements OnInit{
  @Input() userId!: number;
  @Input() episodeId!: number;
  isBookmarked: boolean = false;
    @Output() unfavorite = new EventEmitter<number>();  // Emit episode ID when unfavorite

  constructor(private bookmarkService: BookmarkService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.bookmarkService.isBookmarked(this.episodeId).subscribe({
      next: (isBookmarked) => {
        console.log(isBookmarked);
        this.isBookmarked = isBookmarked;
      },
      error: (error) => {
        console.error('Error checking bookmark:', error);
      }
    })};
    
    unfavoriteEpisode() {
    
        this.unfavorite.emit();  // Emit the episode ID to the parent component
    }
      toggleBookmark(): void {
        this.bookmarkService[this.isBookmarked ? 'removeBookmark' : 'addBookmark'](this.episodeId)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                console.log('kkkkkkkkkkkkkkllllllllllllll')
                this.toastr.error('You are not authorized!', 'Unauthorized');
              } else {
                this.toastr.error('Failed to update bookmark.', 'Error');
              }
              return throwError(() => error); // Prevents the state from toggling
            })
          )
          .subscribe({
            next: () => {
              this.isBookmarked = !this.isBookmarked; // Only toggle if successful
             
            },
            error: () => {} // Prevents state change on error
          });
        }}