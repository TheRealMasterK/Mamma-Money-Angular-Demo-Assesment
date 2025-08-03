import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletePage } from './complete.page';
import { IonicModule } from '@ionic/angular';

describe('CompletePage', () => {
  let component: CompletePage;
  let fixture: ComponentFixture<CompletePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletePage, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the complete page content', () => {
    const completeContent = fixture.nativeElement.querySelector('ion-content');
    expect(completeContent).toBeTruthy();
  });

  it('should display the header component', () => {
    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeTruthy();
  });

  it('should have proper page structure', () => {
    const page = fixture.nativeElement.querySelector('ion-page');
    expect(page).toBeTruthy();
  });

  it('should display completion message or content', () => {
    const content = fixture.nativeElement.querySelector('ion-content');
    expect(content.textContent).toBeTruthy();
  });
});
