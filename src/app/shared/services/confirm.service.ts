import { EventEmitter, Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { ToastService } from "./toast.service";

@Injectable({
    providedIn: 'root',
})
export class ConfirmService {
  
    constructor(
      private readonly confirmationService: ConfirmationService,
      private readonly toastService: ToastService
    ) { }
  
    confirm(event: Event, message: string, detailReject: string, acceptCallBack: () => void, rejectCallBack: () => void): void {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: message,
        accept: () => {
            acceptCallBack();
            this.toastService.toast('success', 'Success', detailReject);
        },
        reject: () => {
          rejectCallBack();
            this.toastService.toast('warn', 'Reject', detailReject);
        }
      });
    }
}