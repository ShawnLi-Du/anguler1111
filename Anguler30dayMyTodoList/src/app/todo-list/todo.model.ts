// 待辦事項的資料物件模型
export class Todo {

  private title = ''; //事項名稱
  private completed = false; //完成與否
  private editMode = false; //是否處於編輯模式

  constructor(title: string) {
    this.title = title || ''; // 為避免傳入的值為 Falsy 值，稍作處理
  }

  get done(): boolean {
    return this.completed;
  }

  getTitle(): string {
    return this.title;
  }

  //取得此事項是否處於編輯模式
  get editing(): boolean {
    return this.editMode;
  }

  //設定此事項是否可被編輯
  set editable(bl: boolean) {
    this.editMode = bl;
  }

  //設定事項名稱
  setTitle(title: string): void {
    this.title = title;
  }

  toggleCompletion(): void {  //來回切換完成狀態(打勾)
    this.completed = !this.completed;
  }

  /**
 * 設定是否完成
 *
 * @param {boolean} completed
 * @memberof Todo
 */
  setCompleted(completed: boolean): void {
    this.completed = completed;
  }

}
