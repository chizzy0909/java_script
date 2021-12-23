namespace App {
  // 13. Drag & Drop - ドラッグ & ドロップ実装におけるインターフェースの活用
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    drogOverHandler(event: DragEvent): void;
    drogHandler(event: DragEvent): void;
    drogLeaveHandler(event: DragEvent): void;
  }
}
