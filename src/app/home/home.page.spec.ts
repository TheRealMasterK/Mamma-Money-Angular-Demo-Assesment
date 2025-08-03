import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sendInboxTestEvent method', () => {
    expect(typeof component.sendInboxTestEvent).toBe('function');
  });

  it('should not throw when sendInboxTestEvent is called', async () => {
    expect(async () => {
      await component.sendInboxTestEvent();
    }).not.toThrow();
  });
});
