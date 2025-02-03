import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'
import { BookmarkService } from '../../services/bookmark.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-save-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-icon.component.html',
  styleUrl: './save-icon.component.css'
})
export class SaveIconComponent implements OnInit{
  @Input() episodeId!: number;
  isBookmarked: boolean = false;
  @Output() unfavorite = new EventEmitter<number>();  // Emit the episode ID when unfavorite

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarkService.isBookmarked( this.episodeId).subscribe({
      next:(res)=>{
        console.log(res)
        this.isBookmarked = res;
      },
      error:(err)=>{
        console.log(err);
      }
    }
    )
  }

  toggleBookmark(): void {
    if (this.isBookmarked) {
      this.bookmarkService.removeBookmark( this.episodeId).subscribe(() => {
        this.isBookmarked = false;
        this.unfavorite.emit(this.episodeId);  // Emit the episode ID to the parent component

      });
    } else {
      console.log('ddddddddddddddddddddfrefzf')
      this.bookmarkService.addBookmark( this.episodeId).subscribe(() => {
        this.isBookmarked = true;
      });
    }
  }
}
