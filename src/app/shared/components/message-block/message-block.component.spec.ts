import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageBlockComponent } from './message-block.component';
import { IonicModule } from '@ionic/angular';

describe('MessageBlockComponent', () => {
  let component: MessageBlockComponent;
  let fixture: ComponentFixture<MessageBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBlockComponent, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBlockComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message block', () => {
    fixture.detectChanges();
    
    const messageBlock = fixture.nativeElement.querySelector('.message-block');
    expect(messageBlock).toBeTruthy();
  });

  it('should have default display type of error', () => {
    fixture.detectChanges();
    
    const messageBlock = fixture.nativeElement.querySelector('.message-block');
    expect(messageBlock.classList.contains('error')).toBe(true);
  });

  it('should display icon', () => {
    fixture.detectChanges();
    
    const icon = fixture.nativeElement.querySelector('ion-icon');
    expect(icon).toBeTruthy();
  });

  it('should display default error icon', () => {
    fixture.detectChanges();
    
    const icon = fixture.nativeElement.querySelector('ion-icon');
    expect(icon).toBeTruthy();
  });

  it('should display content projection', () => {
    fixture.detectChanges();
    
    const content = fixture.nativeElement.querySelector('span');
    expect(content).toBeTruthy();
  });

  it('should have proper component structure', () => {
    fixture.detectChanges();
    
    const messageBlock = fixture.nativeElement.querySelector('.message-block');
    expect(messageBlock).toBeTruthy();
    expect(messageBlock.classList.contains('ion-text-left')).toBe(true);
    
    const iconWrap = messageBlock.querySelector('.icon-wrap');
    expect(iconWrap).toBeTruthy();
    
    const icon = iconWrap.querySelector('ion-icon');
    expect(icon).toBeTruthy();
    
    const text = messageBlock.querySelector('ion-text');
    expect(text).toBeTruthy();
  });

  it('should have all required inputs', () => {
    expect(component.displayType).toBeTruthy();
    expect(component.showBackground).toBeTruthy();
    expect(component.showContact).toBeTruthy();
    expect(component.contrastBackground).toBeTruthy();
    expect(component.hasBorder).toBeTruthy();
    expect(component.class).toBeTruthy();
    expect(component.iconColor).toBeTruthy();
    expect(component.icon).toBeTruthy();
    expect(component.textColor).toBeTruthy();
  });
}); 