import React from "react";
import { useRouter } from "next/navigation";
interface SearchInSMProps {
  setShow: (val: boolean) => void;
}
const SearchInSM = ({ setShow }: SearchInSMProps) => {
  //   const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstInputValue = (form.elements[0] as HTMLInputElement).value;
    console.log(firstInputValue);
    router.push("/search/" + firstInputValue);
    setShow(false);
  };
  return (
    <div className=" items-center">
      <div
        className="fixed  inset-0 z-10 overflow-y-auto popup"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          onClick={() => setShow(false)}
          className=" absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="flex items-center  justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
            <h3
              className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
              id="modal-title"
            >
              Search
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Unlock the doors to your learning journey.
            </p>

            <form className="mt-4" onSubmit={handleSubmit}>
              <label
                htmlFor="Name"
                className="text-sm text-gray-700 dark:text-gray-200"
              >
                Search
              </label>

              <label className="block mt-3">
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  placeholder="Name of Course"
                  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </label>

              <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style>{`
  .popup {
    transform: translateY(-1%); /* تبدأ من خارج الشاشة */
    animation: slideDown 0.3s forwards;
  }

  @keyframes slideDown {
    to {
      transform: translateY(0); /* تتحرك لمكانها الطبيعي */
    }
  }
`}</style>
    </div>
  );
};

export default SearchInSM;
