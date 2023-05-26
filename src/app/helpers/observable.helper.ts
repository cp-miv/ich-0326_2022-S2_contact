import { Observable } from 'rxjs';

export class ObservableHelper {
  private static _void: Observable<void>;

  public static void(): Observable<void> {
    if (ObservableHelper._void === undefined) {
      ObservableHelper._void = new Observable<void>((observer) => {
        observer.next();
        observer.complete();
      });
    }

    return ObservableHelper._void;
  }
}
