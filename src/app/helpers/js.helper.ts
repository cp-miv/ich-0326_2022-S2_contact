export class JSHelper {
  public static sleep(delayMs: number): void {
    let targetTime = new Date().getTime();
    targetTime += delayMs;

    while (new Date().getTime() < targetTime) {}
  }
}
