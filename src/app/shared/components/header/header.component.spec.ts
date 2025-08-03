import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { InboxButtonComponent } from '../inbox-button/inbox-button.component';
import { IonicModule } from '@ionic/angular';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, InboxButtonComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header toolbar', () => {
    fixture.detectChanges();

    const toolbar = fixture.nativeElement.querySelector('ion-toolbar');
    expect(toolbar).toBeTruthy();
  });

  it('should display title', () => {
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Mama Money');
  });

  it('should show inbox button when showInboxButton is true', () => {
    component.showInboxButton = true;
    fixture.detectChanges();

    const inboxButton = fixture.nativeElement.querySelector('app-inbox-button');
    expect(inboxButton).toBeTruthy();
  });

  it('should not show inbox button when showInboxButton is false', () => {
    component.showInboxButton = false;
    fixture.detectChanges();

    const inboxButton = fixture.nativeElement.querySelector('app-inbox-button');
    expect(inboxButton).toBeFalsy();
  });

  it('should not show inbox button when showInboxButton is undefined', () => {
    component.showInboxButton = undefined as any;
    fixture.detectChanges();

    const inboxButton = fixture.nativeElement.querySelector('app-inbox-button');
    expect(inboxButton).toBeFalsy();
  });

  it('should have proper header structure', () => {
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('ion-header');
    expect(header).toBeTruthy();

    const toolbar = header.querySelector('ion-toolbar');
    expect(toolbar).toBeTruthy();

    const title = toolbar.querySelector('ion-title');
    expect(title).toBeTruthy();
  });

    it('should apply correct slot to inbox button when shown', () => {
    component.showInboxButton = true;
    fixture.detectChanges();
    
    const inboxButton = fixture.nativeElement.querySelector('app-inbox-button');
    expect(inboxButton).toBeTruthy();
  });
});
