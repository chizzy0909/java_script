namespace App {
  // 11. ProjectItem Class - プロジェクト項目の表示
  export class ProjectItem
    extends Component<HTMLDListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    // 12. Getter の利用
    get manday() {
      if (this.project.manday < 20) {
        return this.project.manday.toString() + "人日";
      } else {
        return (this.project.manday / 20).toString() + "人月";
      }
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    // *13  // 15. ドロップ可能な場所
    @Autobind
    dragStartHandler(event: DragEvent) {
      // console.log(event);
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }
    dragEndHandler(_: DragEvent) {
      console.log("dragは終了");
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent = this.manday;
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }
}
