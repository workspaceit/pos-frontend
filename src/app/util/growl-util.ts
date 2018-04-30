import {Router} from '@angular/router';

export  class GrowlUtil {

  constructor(){}

  public static notify(config: GrowlConfig) {
    GrowlUtil.showGrowlNotification(config);
  }

  public static notifyAndNavigate(config: GrowlConfig, path: string, router: Router) {
    GrowlUtil.showGrowlNotification(config);
    setTimeout(function() {
      this.router.navigate([path]);
    }  , 500);
  }

  public static showGrowlNotification(config: GrowlConfig){
    (<any>$).growl[config.type]({title: config.title, message: config.message});
  }

}

export class GrowlConfig {
  type: string;
  title: string;
  message: string;
}
