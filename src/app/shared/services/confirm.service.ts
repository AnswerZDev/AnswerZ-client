import { EventEmitter, Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";

@Injectable({
    providedIn: 'root',
})
export class ConfirmService {
  
  constructor(
    private readonly confirmationService: ConfirmationService,
  ) { }

  // confirm(event: Event, message: string, detailAccept: string, detailReject: string, acceptCallBack: () => void, rejectCallBack: () => void): void {
  //   this.confirmationService.confirm({
  //     target: event.target as EventTarget,
  //     message: message,
  //     accept: () => {
  //         acceptCallBack();
  //         this.toastService.toast('success', 'Success', detailAccept);
  //     },
  //     reject: () => {
  //       rejectCallBack();
  //         this.toastService.toast('warn', 'Reject', detailReject);
  //     }
  //   });
  // }
}