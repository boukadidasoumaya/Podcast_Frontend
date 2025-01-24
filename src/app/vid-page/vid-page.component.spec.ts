import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidPageComponent } from './vid-page.component';

describe('VidPageComponent', () => {
  let component: VidPageComponent;
  let fixture: ComponentFixture<VidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VidPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
