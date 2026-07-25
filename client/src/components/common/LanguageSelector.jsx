import { LANGUAGES } from "../../data/languages";

const LanguageSelector = ({ onChange, value }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={false}
      className="bg-slate-950 border border-slate-700 text-slate-300 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer appearance-none shadow-sm"
    >
      {LANGUAGES.map((eachLanguage) => (
        <option
          key={eachLanguage.id}
          value={eachLanguage.id}
          className="bg-slate-950 text-slate-300 cursor-pointer"
        >
          {eachLanguage.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
