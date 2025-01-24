import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidPlayerComponent } from './vid-player.component';

describe('VidPlayerComponent', () => {
  let component: VidPlayerComponent;
  let fixture: ComponentFixture<VidPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VidPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VidPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
