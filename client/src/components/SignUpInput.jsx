import FormInput from "./FormInput";

const inputFieldsConstantsData = {
  name: {
    label: "Name",
    id: "name",
    type: "text",
    placeholder: "Enter your name here...",
  },
  email: {
    label: "Email",
    id: "email",
    type: "email",
    placeholder: "Enter your email here...",
  },
  password: {
    label: "Password",
    id: "password",
    type: "password",
    placeholder: "Enter your password here...",
  },
};

const SignUpInput = () => {
  return (
    <>
      <form className="space-y-4">
        <FormInput
          label={inputFieldsConstantsData.email.label}
          id={inputFieldsConstantsData.email.id}
          type={inputFieldsConstantsData.email.type}
          placeholder={inputFieldsConstantsData.email.placeholder}
        />
        <FormInput
          label={inputFieldsConstantsData.name.label}
          id={inputFieldsConstantsData.name.id}
          type={inputFieldsConstantsData.name.type}
          placeholder={inputFieldsConstantsData.name.placeholder}
        />
        <FormInput
          label={inputFieldsConstantsData.password.label}
          id={inputFieldsConstantsData.password.id}
          type={inputFieldsConstantsData.password.type}
          placeholder={inputFieldsConstantsData.password.placeholder}
        />
      </form>
    </>
  );
};

export default SignUpInput;
