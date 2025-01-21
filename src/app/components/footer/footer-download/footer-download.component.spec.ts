import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDownloadComponent } from './footer-download.component';

describe('FooterDownloadComponent', () => {
  let component: FooterDownloadComponent;
  let fixture: ComponentFixture<FooterDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterDownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
