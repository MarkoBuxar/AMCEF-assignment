import { Config } from '../Config/Config';
import { Logger } from '../Logger/Logger';

export class Utils {
  public static GetLogLevel(): string[] {
    return Config.Instance.Get('log.level');
  }

  public static CheckLogLevel(log: string): boolean {
    return this.GetLogLevel().includes(log);
  }

  public static Timestamp(): string {
    const today = new Date();
    return `[${today
      .getHours()
      .toString()
      .padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}]`;
  }

  public static NormaliseEnum(str: string): string {
    return this.toJadenCase(str.replace(/_/g, ' '));
  }

  public static DeNormaliseEnum(str: string): string {
    return str.replace(/ /g, '_').toUpperCase();
  }

  public static toJadenCase(str: string): string {
    return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
  }
}
