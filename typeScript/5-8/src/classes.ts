abstract class Department {
  //static メソッド & プロパティ
  static fiscalYear = 2020;
  //   private readonly id: string;
  //   name: string;

  //　プロパティのオーバーライド & "protected" 修飾子
  protected employees: string[] = [];

  static createEmployee(name1: string) {
    return { name: name1 };
  }

  constructor(protected readonly id: string, public name: string) {
    // this.name = n;
    // this.id = id;
  }

  //   describe(this: Department) {
  //     // console.log("Dapeatment: " + this.name);
  //     console.log(`Department ${this.id}: ${this.name}`);
  //   }
  // abstract クラス（抽象クラス）
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployees() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// 継承
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admin: string[]) {
    super(id, "IT");
    this.admins = admin;
  }
  describe() {
    console.log(`Department (${this.id}): ${this.name}`);
  }
}
class AccountingDepartment extends Department {
  // Getter & Setter
  private lastReporter: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReporter) {
      return this.lastReporter;
    }
    throw new Error("レポートが見つかりません。");
  }
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("正しい値を設定してください。");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReporter = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  describe() {
    console.log("会計部門 - ID: " + this.id);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReporter = text;
  }

  printReports() {
    console.log(this.reports);
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }
}

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const account = new ITDepartment("id1", ["IKEDA"]);
account.describe(); // Department id1: IKEDA

account.addEmployee("Max");
account.addEmployee("Manu");
account.printEmployees(); //2 //(2) ['Max', 'Manu']
console.log(account);

// const accounting = new AccountingDepartment("d2", []);
const accounting = AccountingDepartment.getInstance();
console.log(accounting);
accounting.mostRecentReport = "通期会計レポート";
accounting.addReport("Something");
console.log(accounting.mostRecentReport);
accounting.printReports();
accounting.addEmployee("Manu");
accounting.addEmployee("Max");
accounting.printEmployees();
accounting.describe();
