import { FileArrowDown } from "phosphor-react";
import { Oval } from "react-loader-spinner";

interface ButtonProps {
  isLoading: Boolean
  type: "button" | "submit" | "reset" | undefined
}

export function Button({ isLoading, type }: ButtonProps) {
  return (
    <button 
      type={type} 
      className="relative group mt-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
    >
      <div className="relative px-8 py-3 bg-[#0A0A0F] rounded-[10px] leading-none flex items-center gap-4">
        {isLoading ? (
          <Oval
            height={25}
            width={90}
            color="#60A5FA"
            secondaryColor="#EC4899"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        ) : (
          <>
            <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">Download</span>
            <FileArrowDown size={28} weight="bold" className="text-pink-500" />
          </>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
}
