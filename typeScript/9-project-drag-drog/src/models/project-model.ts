namespace App {
  // 8. Project Type - 追加のクラス & カスタム型
  export enum ProjectStatus {
    Active,
    Finished,
  }

  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public manday: number,
      public status: ProjectStatus
    ) {}
  }
}
