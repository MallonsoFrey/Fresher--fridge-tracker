type AddButtonProps = {
  addedProductsLength: number;
  onClick: () => void;
};

export default function AddButton({
  addedProductsLength,
  onClick,
}: AddButtonProps) {
  return (
    <button
      className={`md:hidden ${addedProductsLength > 1 ? "" : "hidden"} block fixed z-40 bottom-4 right-4 h-20 w-20 opacity-[0.8]`}
      onClick={onClick}
    >
      <svg
        viewBox="-2.4 -2.4 28.80 28.80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#59744d"
      >
        <g
          id="SVGRepo_bgCarrier"
          strokeWidth="0"
          transform="translate(3.6000000000000014,3.6000000000000014), scale(0.7)"
        >
          <rect
            x="-2.4"
            y="-2.4"
            width="28.80"
            height="28.80"
            rx="14.4"
            fill="#e3efda"
            strokeWidth="0"
          ></rect>
        </g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 8V16M16 12H8M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke="#59744d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
    </button>
  );
}
