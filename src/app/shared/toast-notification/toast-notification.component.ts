import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-toast-notification',
    templateUrl: './toast-notification.component.html',
    styleUrls: ['./toast-notification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastNotificationComponent {
    @Input() toast: { message: string, type: 'success' | 'danger' } | null = null;
    @Output() close = new EventEmitter<void>();

    closeToast() {
        this.close.emit();
    }
}
