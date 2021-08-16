import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbComponentStatus, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Profile } from '../../../@core/models/user/profile';
import { Store } from '@ngrx/store';
import { loadProfileRequest, loadUserStateRequest } from '../../../@store/actions/user.actions';
import { selectProfile, selectUserCurrentState } from '../../../@store/selectors/user.selector';
import { AppState } from '../../../@store/appStore';
import { UserCurrentState } from '../../../@core/models/user/userState';
import { DEFAULT_THEME } from '../../styles/theme.default';
import { apiServerUrl } from '../../../@core/implementations/serverUrl';
import { EventLevel } from '../../../@core/models/events/eventLevel';
import { EventsSseService } from '../../../@common/services/events/eventsSseService';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private interval: any = null;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  profile: Profile;
  userState: UserCurrentState;

  currentTheme = DEFAULT_THEME.name;

  userMenu = [{ title: 'Profile', link: '/app/settings/profile' }, { title: 'Log out', link: '/auth/logout' }];

  websiteLink = apiServerUrl();

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private toastrService: NbToastrService,
    private eventsSseService: EventsSseService,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(loadProfileRequest());
    this.store.dispatch(loadUserStateRequest());
    this.currentTheme = this.themeService.currentTheme;

    this.store.select(selectProfile)
      .subscribe(profile => {
        this.profile = profile;

        if (!!profile?.adminTheme) this.changeTheme(profile.adminTheme);
      });

    this.store.select(selectUserCurrentState)
      .subscribe(state => {
        this.userState = state;
      })

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.eventsSseService.getServerSentEvent()
        .subscribe(event => {
          this.toastrService.show(event.message, event.title, {
            status: this.eventLevelToStatus(event.level)
          });
        });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    clearInterval(this.interval);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  private eventLevelToStatus(level: EventLevel): NbComponentStatus {
    switch (level) {
      case EventLevel.Success:
        return 'success';
      case EventLevel.Warning:
        return 'warning';
      case EventLevel.Error:
        return 'danger';
      default:
      case EventLevel.Info:
        return 'info';
    }
  }
}
