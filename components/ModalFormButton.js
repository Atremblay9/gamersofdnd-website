import { useState } from 'react';

export default function ModalFormButton() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const days = Array.from(event.target.days).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);

    const formData = {
      name: event.target.name.value,
      format: event.target.format.value,
      days,
      experience: event.target.experience.value,
      email: event.target.email.value,
      discord: event.target.discord.value,
    };

    // Email validation: Check if the email ends with '@nait.ca'
    if (!formData.email.endsWith('@nait.ca')) {
      setEmailError('Please enter a valid NAIT email address.');
      return;
    } else {
      setEmailError('');
    }

    // Checkbox validation: Ensure at least one checkbox is selected
    if (formData.days.length === 0) {
      setCheckboxError('Please select at least one preferred day.');
      return;
    } else {
      setCheckboxError('');
    }

    // TODO: Replace with Prisma DB submission
    console.log('Form Data:', formData);

    // Close the modal after submission
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn-open-modal bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Request a Game
      </button>
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="btn-close-modal absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              Close
            </button>
            <form
              onSubmit={handleFormSubmit}
              className="modal-form space-y-4 text-left"
            >
              <label className="block">
                <span className="text-gray-700">Name:</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded border-gray-400 bg-gray-200 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Desired Format:</span>
                <select
                  name="format"
                  required
                  className="mt-1 block w-full rounded border-gray-400 bg-gray-200 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                >
                  <option value="">Select...</option>
                  <option value="Online">Online</option>
                  <option value="In-person">In-person</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>
              <fieldset className="block">
                <legend className="text-gray-700">Preferred Days:</legend>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="days"
                    value="Wednesday"
                    className="rounded border-gray-400 bg-gray-200 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  />
                  <span>Wednesday</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="days"
                    value="Friday"
                    className="rounded border-gray-400 bg-gray-200 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  />
                  <span>Friday</span>
                </label>
                {checkboxError && (
                  <p className="text-red-500 font-semibold">{checkboxError}</p>
                )}
              </fieldset>
              <label className="block">
                <span className="text-gray-700">Experience:</span>
                <textarea
                  name="experience"
                  rows="4"
                  required
                  className="mt-1 block w-full rounded border-gray-400 bg-gray-200 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                ></textarea>
              </label>
              <label className="block">
                <span className="text-gray-700">NAIT Email:</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded border-gray-400 bg-gray-200 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
              </label>
              {emailError && <p className="text-red-500 font-semibold">{emailError}</p>}
              <label className="block">
                <span className="text-gray-700">Discord Username:</span>
                <input
                  type="text"
                  name="discord"
                  required
                  className="mt-1 block w-full rounded border-gray-400 bg-gray-200 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded shadow hover:bg-indigo-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};