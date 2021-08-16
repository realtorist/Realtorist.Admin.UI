import { Injectable, NgZone } from "@angular/core";
import { NbAuthService } from '@nebular/auth';
import { Observable } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { apiServerUrl } from '../../../@core/implementations/serverUrl';
import { Event } from '../../../@core/models/events/event';

@Injectable({
    providedIn: "root"
})
export class EventsSseService {
    private readonly url = apiServerUrl() + '/api/admin/profile/events/sse';

    constructor(private _zone: NgZone, private authService: NbAuthService) { }
    getServerSentEvent(): Observable<Event> {
        return this.authService.getToken().pipe(
            switchMap(token => new Observable<Event>(observer => {
                const eventSource = this.getEventSource(this.url, token.toString());
                eventSource.onmessage = (e: MessageEvent<string>) => {
                    this._zone.run(() => {
                        observer.next(JSON.parse(e.data));
                    });
                };
                eventSource.onerror = error => {
                    this._zone.run(() => {
                        observer.error(error);
                    });
                };
            })
            )
        );
    }
    private getEventSource(url: string, token: string): EventSource {
        return new EventSource(url + '?access_token=' + encodeURIComponent(token));
    }
}