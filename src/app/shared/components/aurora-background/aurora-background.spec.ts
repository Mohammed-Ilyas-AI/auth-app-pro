import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuroraBackground } from './aurora-background';

describe('AuroraBackground', () => {
  let component: AuroraBackground;
  let fixture: ComponentFixture<AuroraBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuroraBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuroraBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
