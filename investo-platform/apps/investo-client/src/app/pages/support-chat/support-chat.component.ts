import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text: string;
  sender: 'user' | 'agent';
  time: Date;
}

@Component({
  selector: 'app-support-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-chat.component.html',
  styleUrl: './support-chat.component.scss'
})
export class SupportChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('chatWindow') private chatWindow!: ElementRef;
  @ViewChild('chatToggleBtn') private chatToggleBtn!: ElementRef;
  
  isChatOpen = false;
  isAgentTyping = false;
  newMessage = '';
  messages: ChatMessage[] = [];
  unreadMessages = 0;
  
  agent = {
    avatar: 'assets/images/support-agent.png',
    role: 'Investment Advisor'
  };
  
  private botResponses: string[] = [
    'Thank you for contacting Investo support. How can I help you today?',
    'I understand your question about blockchain investments. Our platform uses Ethereum and Polygon networks for tokenization.',
    'The minimum investment amount varies by property, but typically starts at $1,000 USD.',
    'Yes, all of our real estate properties are verified through our due diligence process.',
    'You can track your investments in real-time from your dashboard.',
    'Our average annual ROI for real estate investments has been 8-12% over the past 3 years.',
    'For KYC verification, you\'ll need to provide a government-issued ID and proof of address.',
    'I\'m checking with our investment team and will get back to you shortly.',
    'You can withdraw your funds after the minimum investment period, which is typically 6 months.',
    'Is there anything else I can help you with today?'
  ];
  
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.addBotMessage('Hello! 👋 Welcome to Investo. How can I assist you with your investment journey today?');
      this.incrementUnreadMessages();
    }, 1000);
  }
  
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    // Clean up any resources if needed
  }
  
  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    
    if (this.isChatOpen) {
      // Reset unread count when chat is opened
      this.unreadMessages = 0;
    }
  }
  
  // Close the chat when clicking outside of it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isChatOpen) return;

    // Get the element that was clicked
    const clickedElement = event.target as HTMLElement;
    
    // Check if the clicked element is within the chat component
    const chatComponent = this.elementRef.nativeElement;
    const isClickInsideChat = chatComponent.contains(clickedElement);
    
    // If click is outside the chat component, close the chat
    if (!isClickInsideChat) {
      this.isChatOpen = false;
    }
  }
  
  // Stop propagation on the chat window to prevent closing when clicking inside
  onChatWindowClick(event: Event): void {
    event.stopPropagation();
  }
  
  sendMessage(): void {
    if (!this.newMessage.trim()) return;
    
    this.addMessage(this.newMessage, 'user');
    this.newMessage = '';
    
    this.isAgentTyping = true;
    
    // Simulate different typing durations based on message length
    const responseTime = Math.min(Math.floor(Math.random() * 2000) + 1000, 3000);
    setTimeout(() => {
      this.isAgentTyping = false;
      this.getAutomatedResponse();
    }, responseTime);
  }
  
  private addMessage(text: string, sender: 'user' | 'agent'): void {
    this.messages.push({
      text,
      sender,
      time: new Date()
    });
  }
  
  private addBotMessage(text: string): void {
    this.addMessage(text, 'agent');
    
    if (!this.isChatOpen) {
      this.incrementUnreadMessages();
    }
  }
  
  private incrementUnreadMessages(): void {
    if (!this.isChatOpen) {
      this.unreadMessages++;
    }
  }
  
  private getAutomatedResponse(): void {
    const randomIndex = Math.floor(Math.random() * this.botResponses.length);
    this.addBotMessage(this.botResponses[randomIndex]);
  }
  
  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}