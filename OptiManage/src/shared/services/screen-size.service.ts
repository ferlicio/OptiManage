import { Injectable, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  mobileQuery: MediaQueryList;
  smallScreenQuery: MediaQueryList;
  isMobile!: boolean|undefined;
  isSmallScreen!: boolean;
  mobileQueryListener: () => void = () => {};

  constructor(private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 610px)'); //tamanho da tela para ser configurado como mobile
    this.smallScreenQuery = media.matchMedia('(max-width: 1002px)'); //tamanho da tela para ser configurado como tela pequena
  }

  screenSize(): Observable<string> {
    return new Observable<string>((observer) => {
      this.mobileQueryListener = () => { 
        this._mobileQueryListener(observer)//chama a cada mudança
      };
      this.mobileQuery.addListener(this.mobileQueryListener);
      this.smallScreenQuery.addListener(this.mobileQueryListener);
      this._mobileQueryListener(observer);//chama a primeira vez
    });
  } 

  

  _mobileQueryListener:(observer:Observer<string>) => void = (observer) => {
    this.isMobile = this.mobileQuery.matches;
    this.isSmallScreen = this.smallScreenQuery.matches;
    observer.next(this.isMobile===true
      ?"mobile"
      :(this.isSmallScreen===true)
        ?"smallScreen"
        :"desktop"
      );
  };

  removeMobileQueryListener() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}

