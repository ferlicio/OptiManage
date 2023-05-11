import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ScreenSizeService } from 'src/shared/services/screen-size.service';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.scss']
})
export class TelaComponent  implements OnInit {
  pageTitle!: string
  screenSize!: string;
  mode!:MatDrawerMode;
  opened!: boolean;
  isMobile!: Boolean;
  i=0

  constructor(
    private titleService: Title,
    public router: Router,
    private changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher,
    private screenSizeService: ScreenSizeService,
    ) {
  }

  ngOnInit(): void {
    this.setPageTitle()
    this.screenSizeService.screenSize().subscribe((screenSize) => {
      this.screenSize = screenSize;
      console.log(this.screenSize);
      this.adaptativeNav();
      
    })
  }

  private setPageTitle(): void {
    const pageTitle = this.getPageTitle(this.router.url);
    this.titleService.setTitle(pageTitle);
    this.pageTitle = pageTitle.slice(12);
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const pageTitle = this.getPageTitle(event.urlAfterRedirects);
        this.titleService.setTitle(pageTitle);
        this.pageTitle = pageTitle.slice(12);
        if (this.screenSize !=='desktop') {
          this.opened = false
        }
      }
    });
  }

  private getPageTitle(url: string): string {
    url = url.split('?')[0];
    const pageTitles = environment.pagesTitle;
    return pageTitles[url] || '--Sem Titulo--';
  }

  private adaptativeNav: () => void = () => {
    if (this.screenSize !=='desktop') {
      // Define o modo do mat-sidenav como "over" para dispositivos móveis
      this.opened = false;
      this.mode = 'over';
      this.changeDetectorRef.detectChanges();

    } else {
      // Define o modo do mat-sidenav como "side" para dispositivos maiores
      this.mode = 'side';
      this.opened = true;
      this.changeDetectorRef.detectChanges();//
    }
  }

  ngOnDestroy(): void {
    this.screenSizeService.removeMobileQueryListener();
  }
}
