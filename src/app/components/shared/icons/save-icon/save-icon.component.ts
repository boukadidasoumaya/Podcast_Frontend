import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'
import { BookmarkService } from '../../../../services/bookmark.service';
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

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarkService.isBookmarked( this.episodeId).subscribe(
      (isBookmarked) => {
        console.log(isBookmarked)
        this.isBookmarked = isBookmarked;
      },
      (error) => {
        console.error('Error checking bookmark:', error);
      }
    );
  }

  toggleBookmark(): void {
    if (this.isBookmarked) {
      this.bookmarkService.removeBookmark( this.episodeId).subscribe(() => {
        this.isBookmarked = false;
      });
    } else {
      console.log('ddddddddddddddddddddfrefzf')
      this.bookmarkService.addBookmark(this.episodeId).subscribe(() => {
        this.isBookmarked = true;
      });
    }
  }
}
