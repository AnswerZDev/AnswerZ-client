import { EventEmitter, Injectable } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root',
})
export class ConfirmService {
  
  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) { }

  confirm(event: Event, message: string, detailAccept: string, detailReject: string, acceptCallBack: () => void, rejectCallBack: () => void): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      accept: () => {
          acceptCallBack();
          this.messageService.add({ severity: 'success', detail: detailAccept });
      },
      reject: () => {
        rejectCallBack();
          this.messageService.add({ severity: 'warn', detail: detailReject });
      }
    });
  }
}