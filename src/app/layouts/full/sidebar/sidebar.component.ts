import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { ProdMenuItems } from '../../../shared/menu-items/prod-menu-items';
import { environment } from 'src/environments/environment';
import { UsercredentialsService } from 'src/app/services/usercredentials.service';
import { Router } from '@angular/router';


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
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.menuItems = environment.production ?  new ProdMenuItems() : new MenuItems();
    this.username = this.UsercredentialsService.username;

    if (this.UsercredentialsService.userType === 'admin') {
      // Add a menu item for admin users
      this.menuItems.addMenuItem({
        // Set the properties of the menu item as needed
        state: 'admin',
        name: 'Admin Mgt',
        type: 'link',
        icon: 'fact_check'
      });

    }


  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  signout(){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.router.navigate(['/auth/login'])
  }
}
