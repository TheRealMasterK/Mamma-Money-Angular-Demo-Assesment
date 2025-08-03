import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxComponent } from './inbox.component';
import { InboxService } from '@services/inbox.service';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { BrazeContentCard } from '@models/braze/braze-content-card';
import { IonicModule } from '@ionic/angular';

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;
  let inboxService: jasmine.SpyObj<InboxService>;
  let modalController: jasmine.SpyObj<ModalController>;

  // Helper function to create valid mock cards
  const createMockCard = (
    overrides: Partial<BrazeContentCard> = {}
  ): BrazeContentCard => ({
    id: 'test-id',
    created: 1704067200,
    expiresAt: 1735689599,
    title: 'Test Card',
    cardDescription: 'Test Description',
    domain: 'braze',
    type: 'content_card',
    viewed: false,
    clicked: false,
    pinned: false,
    dismissed: false,
    dismissible: true,
    openURLInWebView: true,
    extras: { type: 'inbox' },
    ...overrides,
  });

  beforeEach(async () => {
    const inboxServiceSpy = jasmine.createSpyObj(
      'InboxService',
      ['markAsViewed', 'dismissCard'],
      {
        cards: jasmine.createSpy('cards').and.returnValue([]),
      }
    );
    const modalControllerSpy = jasmine.createSpyObj('ModalController', [
      'dismiss',
    ]);

    await TestBed.configureTestingModule({
      imports: [InboxComponent],
      providers: [
        { provide: InboxService, useValue: inboxServiceSpy },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: AngularDelegate, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    inboxService = TestBed.inject(InboxService) as jasmine.SpyObj<InboxService>;
    modalController = TestBed.inject(
      ModalController
    ) as jasmine.SpyObj<ModalController>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log when inbox is opened', () => {
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith(
      'Inbox opened - checking for content cards...'
    );
  });

  describe('card display', () => {
    it('should display cards when available', () => {
      const mockCards = [
        createMockCard({
          id: '1',
          title: 'Card 1',
          cardDescription: 'Description 1',
        }),
        createMockCard({
          id: '2',
          title: 'Card 2',
          cardDescription: 'Description 2',
        }),
      ];

      (inboxService.cards as jasmine.Spy).and.returnValue(mockCards);
      fixture.detectChanges();

      const cardElements = fixture.nativeElement.querySelectorAll('ion-item');
      expect(cardElements.length).toBe(2);
    });

    it('should display card titles and descriptions', () => {
      const mockCards = [
        createMockCard({
          id: '1',
          title: 'Test Title',
          cardDescription: 'Test Description',
        }),
      ];

      (inboxService.cards as jasmine.Spy).and.returnValue(mockCards);
      fixture.detectChanges();

      const titleElement = fixture.nativeElement.querySelector('h2');
      const descriptionElement = fixture.nativeElement.querySelector('p');

      expect(titleElement.textContent).toContain('Test Title');
      expect(descriptionElement.textContent).toContain('Test Description');
    });

    it('should show empty state when no cards', () => {
      (inboxService.cards as jasmine.Spy).and.returnValue([]);
      fixture.detectChanges();

      const emptyState =
        fixture.nativeElement.querySelector('.no-cards-message');
      expect(emptyState).toBeTruthy();
      expect(emptyState.textContent).toContain('No notifications');
    });
  });

  describe('card interactions', () => {
    let mockCard: BrazeContentCard;

    beforeEach(() => {
      mockCard = createMockCard({ id: 'test-card', title: 'Test Card' });
      (inboxService.cards as jasmine.Spy).and.returnValue([mockCard]);
    });

    it('should mark card as viewed when opened', () => {
      fixture.detectChanges();

      const openButton = fixture.nativeElement.querySelector(
        'ion-button[color="primary"]'
      );
      openButton.click();

      expect(inboxService.markAsViewed).toHaveBeenCalledWith('test-card');
    });

    it('should dismiss card when dismiss button is clicked', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      fixture.detectChanges();

      const dismissButton = fixture.nativeElement.querySelector(
        'ion-button[color="danger"]'
      );
      dismissButton.click();

      expect(window.confirm).toHaveBeenCalledWith(
        'Are you sure you want to dismiss this message?'
      );
      expect(inboxService.dismissCard).toHaveBeenCalledWith('test-card');
    });

    it('should not dismiss card when user cancels confirmation', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      fixture.detectChanges();

      const dismissButton = fixture.nativeElement.querySelector(
        'ion-button[color="danger"]'
      );
      dismissButton.click();

      expect(inboxService.dismissCard).not.toHaveBeenCalled();
    });

    it('should handle card opening with URL', () => {
      const cardWithUrl = createMockCard({
        id: 'test-card',
        url: 'https://example.com',
        openURLInWebView: true,
      });
      (inboxService.cards as jasmine.Spy).and.returnValue([cardWithUrl]);

      spyOn(window, 'open');
      fixture.detectChanges();

      const openButton = fixture.nativeElement.querySelector(
        'ion-button[color="primary"]'
      );
      openButton.click();

      expect(inboxService.markAsViewed).toHaveBeenCalledWith('test-card');
      expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank');
    });

    // Note: Testing window.location.href assignment causes page reloads in unit tests
    // This behavior should be tested in integration tests instead
    it('should handle card opening with URL in same window', () => {
      const cardWithUrl = createMockCard({
        id: 'test-card',
        url: 'https://example.com',
        openURLInWebView: false,
      });
      (inboxService.cards as jasmine.Spy).and.returnValue([cardWithUrl]);

      fixture.detectChanges();

      const openButton = fixture.nativeElement.querySelector(
        'ion-button[color="primary"]'
      );
      openButton.click();

      expect(inboxService.markAsViewed).toHaveBeenCalledWith('test-card');
      // Browser navigation behavior is tested in integration tests
    });

    it('should handle card opening without URL', () => {
      const cardWithoutUrl = createMockCard({
        id: 'test-card',
        url: undefined,
      });
      (inboxService.cards as jasmine.Spy).and.returnValue([cardWithoutUrl]);

      spyOn(window, 'open');
      fixture.detectChanges();

      const openButton = fixture.nativeElement.querySelector(
        'ion-button[color="primary"]'
      );
      openButton.click();

      expect(inboxService.markAsViewed).toHaveBeenCalledWith('test-card');
      expect(window.open).not.toHaveBeenCalled();
    });
  });

  describe('modal functionality', () => {
    it('should close modal when close button is clicked', () => {
      fixture.detectChanges();

      const closeButton = fixture.nativeElement.querySelector('ion-button');
      closeButton.click();

      expect(modalController.dismiss).toHaveBeenCalled();
    });

    it('should have proper modal structure', () => {
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('ion-header');
      const toolbar = header.querySelector('ion-toolbar');
      const title = toolbar.querySelector('ion-title');
      const closeButton = toolbar.querySelector('ion-button');

      expect(header).toBeTruthy();
      expect(toolbar).toBeTruthy();
      expect(title.textContent).toContain('Inbox');
      expect(closeButton).toBeTruthy();
    });
  });

  describe('component structure', () => {
    it('should have proper list structure', () => {
      const mockCards = [createMockCard()];
      (inboxService.cards as jasmine.Spy).and.returnValue(mockCards);
      fixture.detectChanges();

      const list = fixture.nativeElement.querySelector('ion-list');
      const item = list.querySelector('ion-item');
      const label = item.querySelector('ion-label');

      expect(list).toBeTruthy();
      expect(item).toBeTruthy();
      expect(label).toBeTruthy();
    });

    it('should have action buttons for each card', () => {
      const mockCards = [createMockCard()];
      (inboxService.cards as jasmine.Spy).and.returnValue(mockCards);
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('ion-button');
      expect(buttons.length).toBe(3); // Close button + 2 action buttons per card
    });
  });
});
