type SearchProps = {
  searchedProduct: string;
  setSearchedProduct: (search: string) => void;
  placeholder: string;
};

export default function Search({
  searchedProduct,
  setSearchedProduct,
  placeholder,
}: SearchProps) {
  return (
    <div className="relative w-full flex justify-start items-center">
      <svg
        className="absolute left-0 pointer-events-none h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#687063"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="#687063"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
      <svg
        onClick={() => setSearchedProduct("")}
        className="absolute right-3 h-4 w-4 hover:fill-[#98a292] cursor-pointer"
        fill="#687063"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path>{" "}
        </g>
      </svg>
      <input
        className="border-[#F4F2ECFA] border-2 rounded-[24px] ml-7 bg-transparent w-full h-8 pl-3"
        type="text"
        placeholder={placeholder}
        value={searchedProduct}
        onChange={(e) => setSearchedProduct(e.target.value)}
      />
    </div>
  );
}
