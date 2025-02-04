import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'
import { BookmarkService } from '../../../../services/bookmark.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { throwError } from 'rxjs';

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

  constructor(private bookmarkService: BookmarkService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.bookmarkService.isBookmarked( this.episodeId).subscribe(
      (isBookmarked) => {
        console.log(isBookmarked)
        this.isBookmarked = isBookmarked;
      },
      (error) => {
      }
    );
  }

      toggleBookmark(): void {
        this.bookmarkService[this.isBookmarked ? 'removeBookmark' : 'addBookmark'](this.episodeId)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
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