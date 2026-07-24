import { LANGUAGES } from "../../data/languages";

const LanguageSelector = ({ onChange, value }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={false}
      className="bg-gray-100 text-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {LANGUAGES.map((eachLanguage) => (
        <option
          key={eachLanguage.id}
          value={eachLanguage.id}
          className="bg-gray-100 text-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {eachLanguage.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
