export const SUPPORTED_LANGUAGES = [
  {
    id: `${new Date().getTime()}-c`,
    name: "C",
    extension: ".c",
  },
  {
    id: `${new Date().getTime()}-cpp`,
    name: "C++",
    extension: ".cpp",
  },
  {
    id: `${new Date().getTime()}-java`,
    name: "Java",
    extension: ".java",
  },
  {
    id: `${new Date().getTime()}-csharp`,
    name: "C#",
    extension: ".cs",
  },
  {
    id: `${new Date().getTime()}-python`,
    name: "Python",
    extension: ".py",
  },
  {
    id: `${new Date().getTime()}-javascript`,
    name: "JavaScript",
    extension: ".js",
  },
];

export const getLanguagesName = (languageId) => {
  const language = SUPPORTED_LANGUAGES.find((lang) => lang.id === languageId);

  return language ? language.name : languageId;
};
