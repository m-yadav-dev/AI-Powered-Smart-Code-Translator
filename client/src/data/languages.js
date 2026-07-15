const LANGUAGES = [
  {
    id: "javascript",
    name: "JavaScript",
  },
  {
    id: "python",
    name: "Python",
  },
  {
    id: "java",
    name: "Java",
  },
  {
    id: "cpp",
    name: "C++",
  },
  {
    id: "csharp",
    name: "C#",
  },
];

const CODE_EDITOR_LANGUAGES = {
  c: "c",
  cpp: "cpp",
  csharp: "csharp",
  java: "java",
  python: "python",
  javascript: "javascript",
};

const STARTER_CODE = {
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  csharp:
    'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  python:
    'def main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()',
  javascript:
    'function main() {\n    console.log("Hello, World!");\n}\n\nmain();',
};

export { LANGUAGES, CODE_EDITOR_LANGUAGES, STARTER_CODE };
