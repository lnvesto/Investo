import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportChatComponent } from './support-chat.component';
import { FormsModule } from '@angular/forms';

describe('SupportChatComponent', () => {
  let component: SupportChatComponent;
  let fixture: ComponentFixture<SupportChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportChatComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with chat closed', () => {
    expect(component.isChatOpen).toBeFalse();
  });

  it('should toggle chat when button is clicked', () => {
    expect(component.isChatOpen).toBeFalse();
    component.toggleChat();
    expect(component.isChatOpen).toBeTrue();
    component.toggleChat();
    expect(component.isChatOpen).toBeFalse();
  });

  it('should not send empty messages', () => {
    const messagesBefore = component.messages.length;
    component.newMessage = '   ';
    component.sendMessage();
    expect(component.messages.length).toBe(messagesBefore);
  });

  it('should add user message and generate bot response when sending a message', () => {
    const messagesBefore = component.messages.length;
    component.newMessage = 'Hello, I need help';
    component.sendMessage();
    expect(component.messages.length).toBe(messagesBefore + 1);
    expect(component.messages[component.messages.length - 1].sender).toBe('user');
    expect(component.messages[component.messages.length - 1].text).toBe('Hello, I need help');
    expect(component.isAgentTyping).toBeTrue();
  });
});