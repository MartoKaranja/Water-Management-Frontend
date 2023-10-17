import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { ProdMenuItems } from '../../../shared/menu-items/prod-menu-items';
import { environment } from 'src/environments/environment';
import { UsercredentialsService } from 'src/app/services/usercredentials.service';
import { Router } from '@angular/router';
import { LoginService } from 'projects/water/src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  public menuItems : MenuItems;

  username : string;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private UsercredentialsService : UsercredentialsService,
    private router: Router,
    private auth : LoginService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.menuItems = environment.production ?  new ProdMenuItems() : new MenuItems();
    this.username = this.UsercredentialsService.username;
    console.log("Username: "+this.username)
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  signout(){

    this.auth.logout()
      .subscribe({
        next: (response) => {
          console.log(response)
          // Redirect to the dashboard'

          this.router.navigateByUrl('/auth')
            .then(() => {
              console.log('Navigation successful');
            })
            .catch((err) => {
              console.error('Navigation failed:', err);
            });
        },
        error: (error: any) => {
          console.error(error);
        }
      }
      );
    this.router.navigate(['/auth/login'])
  }
}
