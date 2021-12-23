namespace App {
  // 14. ドラッグイベント & 状態をUIに反映する
  // 6. ProjectList Class - プロジェクト一覧の表示
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    //   templateElement: HTMLTemplateElement;
    //   hostElement: HTMLDivElement;
    //   element: HTMLElement;
    assignedProjects: Project[]; // *7

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      // this.templateElement = document.getElementById(
      //   "project-list"
      // )! as HTMLTemplateElement;
      // this.hostElement = document.getElementById("app")! as HTMLDivElement;
      this.assignedProjects = []; // *7

      // const importedNode = document.importNode(
      //   this.templateElement.content,
      //   true
      // );
      // this.element = importedNode.firstElementChild as HTMLElement;
      // this.element.id = `${this.type}-projects`;

      // // *7
      // projectState.addListener((projects: Project[]) => {
      //   // *9 Enum によるプロジェクトのフィルタリング
      //   const relevantProjects = projects.filter((prj) => {
      //     if (this.type === "active") {
      //       return prj.status === ProjectStatus.Active;
      //     }
      //     return prj.status === ProjectStatus.Finished;
      //   });

      //   this.assignedProjects = relevantProjects;
      //   this.renderProjects();
      // });

      // this.attach();
      this.configure();
      this.renderContent();
    }

    @Autobind
    drogOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @Autobind
    drogHandler(event: DragEvent) {
      const prjId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @Autobind
    drogLeaveHandler(_: DragEvent) {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    // *10
    configure() {
      this.element.addEventListener("dragover", this.drogOverHandler);
      this.element.addEventListener("drop", this.drogHandler);
      this.element.addEventListener("dragleave", this.drogLeaveHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
    }

    //   private attach() {
    //     this.hostElement.insertAdjacentElement("beforeend", this.element);
    //   }

    // *7
    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = ""; // *9
      for (const prjItem of this.assignedProjects) {
        // const listItem = document.createElement("li");
        // listItem.textContent = prjItem.title;
        // listEl.appendChild(listItem);
        new ProjectItem(listEl.id, prjItem); // *11
      }
    }
  }
}
