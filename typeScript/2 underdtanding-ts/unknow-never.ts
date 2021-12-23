//unknown型
let userInput: unknown;
let userName: string;

userInput: 5;
userInput: "Max";

if (typeof userInput === "string") {
  userName = userInput;
}

// never型
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}
generateError("エラーが発生しました", 500);
