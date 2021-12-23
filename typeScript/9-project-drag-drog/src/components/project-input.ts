namespace App {
  // 1. DOM要素の取得 & オブジェクト指向
  // ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    //   templateElement: HTMLTemplateElement;
    //   hostElement: HTMLDivElement;
    //   element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    mandayInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      // this.templateElement = <HTMLTemplateElement>(
      //   document.getElementById("project-input")!
      // );
      // this.hostElement = document.getElementById("app")! as HTMLDivElement;

      // const importedNode = document.importNode(
      //   this.templateElement.content,
      //   true
      // );
      // this.element = importedNode.firstElementChild as HTMLFormElement;
      // this.element.id = "user-input"; // 端っこがあったほうがいい

      this.titleInputElement = this.element.querySelector(
        "#title"
      )! as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      )! as HTMLInputElement;
      this.mandayInputElement = this.element.querySelector(
        "#manday"
      )! as HTMLInputElement;

      this.configure();
      // this.attach();
    }

    // 構成、設定
    configure() {
      this.element.addEventListener("submit", this.submitHandler.bind(this));
    }
    //   //添付
    //   private attach() {
    //     this.hostElement.insertAdjacentElement("afterbegin", this.element);
    //   }
    renderContent() {
      // const listId = `${this.type}-projects-list`;
      // this.element.querySelector("ul")!.id = listId;
      // this.element.querySelector("h2")!.textContent =
      //   this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
    }

    // 4. ユーザ入力の取得
    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredManday = this.mandayInputElement.value;

      // 5. Validation - 再利用可能なバリデーション機能の作成
      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const mandayValidatable: Validatable = {
        value: +enteredManday,
        required: true,
        min: 1,
        max: 1000,
      };
      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(mandayValidatable)
      ) {
        alert("入力値が正しくありません。再度お試しください。");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredManday];
      }
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.mandayInputElement.value = "";
    }

    // 2. DOM要素の操作
    @Autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      // console.log(this.titleInputElement.value);
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, manday] = userInput;
        console.log(title, desc, manday);
        projectState.addProject(title, desc, manday);
        this.clearInputs();
      }
    }
  }
}
