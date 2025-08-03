import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxButtonComponent } from './inbox-button.component';
import { InboxService } from '@services/inbox.service';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { InboxComponent } from '../inbox/inbox.component';
import { IonicModule } from '@ionic/angular';

describe('InboxButtonComponent', () => {
  let component: InboxButtonComponent;
  let fixture: ComponentFixture<InboxButtonComponent>;
  let inboxService: jasmine.SpyObj<InboxService>;
  let modalController: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    const inboxServiceSpy = jasmine.createSpyObj('InboxService', [], {
      unreadCount: jasmine.createSpy('unreadCount').and.returnValue(0),
    });
    const modalControllerSpy = jasmine.createSpyObj('ModalController', [
      'create',
    ]);

    await TestBed.configureTestingModule({
      imports: [InboxButtonComponent],
      providers: [
        { provide: InboxService, useValue: inboxServiceSpy },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: AngularDelegate, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InboxButtonComponent);
    component = fixture.componentInstance;
    inboxService = TestBed.inject(InboxService) as jasmine.SpyObj<InboxService>;
    modalController = TestBed.inject(
      ModalController
    ) as jasmine.SpyObj<ModalController>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with no unread messages', () => {
    expect(component.unreadMessages()).toBe(false);
  });

  describe('unread indicator', () => {
    it('should have unread messages signal', () => {
      expect(component.unreadMessages).toBeTruthy();
    });

    it('should initialize with no unread messages', () => {
      expect(component.unreadMessages()).toBe(false);
    });
  });

  describe('button functionality', () => {
    it('should have notification bell icon', () => {
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('ion-button');
      const icon = button.querySelector('ion-icon');

      expect(button).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('name')).toBe('notifications-outline');
    });

    it('should have proper button styling', () => {
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('ion-button');
      expect(button.getAttribute('fill')).toBe('clear');
    });
  });

  describe('modal functionality', () => {
    let mockModal: any;

    beforeEach(() => {
      mockModal = {
        present: jasmine.createSpy('present'),
      };
      modalController.create.and.returnValue(Promise.resolve(mockModal));
    });

    it('should create and present inbox modal when button is clicked', async () => {
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('ion-button');
      await button.click();

      expect(modalController.create).toHaveBeenCalledWith({
        component: InboxComponent,
      });
      expect(mockModal.present).toHaveBeenCalled();
    });

    it('should handle modal creation errors gracefully', async () => {
      modalController.create.and.returnValue(
        Promise.reject(new Error('Modal creation failed'))
      );
      spyOn(console, 'error');

      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('ion-button');
      await button.click();

      expect(console.error).toHaveBeenCalledWith(
        'Error showing inbox:',
        jasmine.any(Error)
      );
    });
  });

  describe('component structure', () => {
    it('should have proper notification button structure', () => {
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector(
        '.notification-button'
      );
      const button = container.querySelector('ion-button');
      const icon = button.querySelector('ion-icon');

      expect(container).toBeTruthy();
      expect(button).toBeTruthy();
      expect(icon).toBeTruthy();
    });

    it('should have proper component structure', () => {
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector(
        '.notification-button'
      );
      expect(container).toBeTruthy();
    });
  });
});
