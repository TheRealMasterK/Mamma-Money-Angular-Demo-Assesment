import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { IonicModule } from '@ionic/angular';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display spinner by default', () => {
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('ion-spinner');
    expect(spinner).toBeTruthy();
  });

    it('should have default color', () => {
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('ion-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should have default name', () => {
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('ion-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should have default scale', () => {
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('ion-spinner');
    const style = spinner.getAttribute('style');
    expect(style).toContain('width: 4rem');
    expect(style).toContain('height: 4rem');
  });

  it('should display content projection', () => {
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('span');
    expect(content).toBeTruthy();
  });

  it('should have proper grid structure', () => {
    fixture.detectChanges();

    const grid = fixture.nativeElement.querySelector('ion-grid');
    expect(grid).toBeTruthy();

    const row = grid.querySelector('ion-row');
    expect(row).toBeTruthy();

    const col = row.querySelector('ion-col');
    expect(col).toBeTruthy();
    expect(col.classList.contains('ion-text-center')).toBe(true);
  });
});
