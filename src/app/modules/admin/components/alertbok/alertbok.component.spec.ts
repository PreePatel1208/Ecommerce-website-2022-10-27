import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertbokComponent } from './alertbok.component';

describe('AlertbokComponent', () => {
  let component: AlertbokComponent;
  let fixture: ComponentFixture<AlertbokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertbokComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AlertbokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
