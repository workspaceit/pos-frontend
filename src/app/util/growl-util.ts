export  class GrowlUtil {

  public static notify(type: string, title: string, message: string) {
    switch (type) {
      case 'error':
        (<any>$).growl.error({title: title, message: message});
        break;
      case 'warning':
        (<any>$).growl.warning({title: title, message: message});
        break;
      case 'notice':
        (<any>$).growl.notice({title: title, message: message});
        break;
    }
  }

}
