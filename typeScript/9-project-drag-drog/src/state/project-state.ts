namespace App {
  // 7. Project State Management - シングルトン & アプリケーションの状態管理
  type Listener<T> = (items: T[]) => void;

  //* 10
  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  class ProjectState extends State<Project> {
    //   private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    //   addListener(listenerFn: Listener) {
    //     this.listeners.push(listenerFn);
    //   }

    addProject(title: string, description: string, manday: number) {
      // const newProject = {
      //   id: Math.random().toString(),
      //   title: title,
      //   description: description,
      //   manday: manday,
      // };
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        manday,
        ProjectStatus.Active
      ); // *8

      this.projects.push(newProject);
      this.updateListeners();
    }
    // 16. ドラッグ & ドロップ機能の完成
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}
