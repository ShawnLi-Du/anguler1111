import { Injectable } from '@angular/core';

//class
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {


  private list: Todo[] = [];
  constructor() { }


  //  取得待辦事項清單
  getList(): Todo[] {
    return this.list;
  }

  //  新增待辦事項
  add(title: string): void {
    // 避免傳入的 title 是無效值或空白字串
    if (title || title.trim()) {
      this.list.push(new Todo(title));
    }
  }
  //移除待辦事項
  remove(index: number): void {
    this.list.splice(index, 1);
  }

  /**
 * 取得已完成/未完成的清單
 *
 * @param {boolean} completed - 要取得已完成還是未完成的清單
 * @returns {Todo[]}
 * @memberof TodoListService
 */
  getWithCompleted(completed: boolean): Todo[] {
    return this.list.filter(todo => todo.done === completed);
  }

  /**
 * 從清單中移除所有已完成之待辦事項
 *
 * @memberof TodoListService
 */
  removeCompleted(): void {
    this.list = this.getWithCompleted(false);
  }

}
