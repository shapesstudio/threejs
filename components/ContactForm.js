import React, { useState } from "react";

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  //   Form validation
  const [errors, setErrors] = useState({});

  //   Setting button text
  const [buttonText, setButtonText] = useState("Send");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (telephone.length <= 0) {
      tempErrors["telephone"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  //   const [form, setForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          telephone: telephone,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Send");

        // Reset form fields
        setFullname("");
        setEmail("");
        setMessage("");
        setTelephone("");
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Send");
      // Reset form fields
      setFullname("");
      setEmail("");
      setMessage("");
      setTelephone("");
    }
    console.log(fullname, email, telephone, message);
  };
  return (
    <main>

        <form
          onSubmit={handleSubmit}
          className="sm:w-8/12 lg:w-5/12 mx-auto rounded-lg shadow-xl flex flex-col px-8 py-8 mb-5 bg-white dark:bg-gray-800"
        >
          <h1 className="text-2xl font-bold dark:text-gray-50">
            Send a message
          </h1>

          <label
            htmlFor="fullname"
            className="text-gray-400 dark:text-gray-300 mt-8"
          >
            Full name<span className="text-red-500 dark:text-gray-50">*</span>
          </label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            name="fullname"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 text-gray-700 dark:text-white dark:border-gray-700"
          />
          {errors?.fullname && (
            <p className="text-red-500">Fullname cannot be empty.</p>
          )}

          <label
            htmlFor="email"
            className="text-gray-400 dark:text-gray-300 mt-4"
          >
            E-mail<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 text-gray-700 dark:text-white dark:border-gray-700"
          />
          {errors?.email && (
            <p className="text-red-500">Email cannot be empty.</p>
          )}

          <label
            htmlFor="telephone"
            className="text-gray-400 dark:text-gray-300 mt-4"
          >
            Telephone<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="telephone"
            value={telephone}
            onChange={(e) => {
              setTelephone(e.target.value);
            }}
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 text-gray-700 dark:text-white dark:border-gray-700"
          />
          {errors?.telephone && (
            <p className="text-red-500">telephone cannot be empty.</p>
          )}
          <label
            htmlFor="message"
            className="text-gray-400 dark:text-gray-300 font-light mt-4"
          >
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 text-gray-700 dark:text-white dark:border-gray-700"
          ></textarea>
          {errors?.message && (
            <p className="text-red-500">Message body cannot be empty.</p>
          )}
          <div className="flex flex-row items-center justify-start">
            <button
              type="submit"
              className="m-auto px-10 mt-8 py-2 text-base rounded-lg text-white bg-indigo-500 hover:bg-indigo-700 flex flex-row items-center"
            >
              {buttonText}
            </button>
          </div>
          <div className="text-left">
            {showSuccessMessage && (
              <p className="text-green-500 font-semibold text-sm my-2">
                Thankyou! Your Message has been delivered.
              </p>
            )}
            {showFailureMessage && (
              <p className="text-red-500">
                Oops! Something went wrong, please try again.
              </p>
            )}
          </div>
        </form>

    </main>
  );
}
