import React from "react";

function SuccessToast({ show, onClose, recipient = "your teammate" }) {
  return (
    <div
      className={`fixed right-6 top-6 z-50 transform transition-all duration-300 ${
        show
          ? "translate-y-0 opacity-100"
          : "-translate-y-2 opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-[420px] overflow-hidden rounded-2xl border border-violet-200 bg-white p-5 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="flex-1">
            <p className="text-base font-semibold text-slate-900">
              Kudos sent 🎉
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Your recognition for{" "}
              <span className="font-medium text-slate-800">{recipient}</span>{" "}
              was posted successfully.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close notification"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-violet-100">
          <div
            className={`h-full bg-violet-500 ${
              show ? "animate-[shrink_3s_linear_forwards]" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default SuccessToast;