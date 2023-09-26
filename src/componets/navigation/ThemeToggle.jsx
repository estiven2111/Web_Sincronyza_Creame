import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";

const ThemeToggle = () => {
  const { theme, themeChangeHandler } = useContext(ThemeContext);

  return (
    <div className="flex ">
      <button
        className=" text-white text-3xl dark:hover:text-lightbluetwo  hover:text-slate-400 hover:scale-125 duration-200"
        onClick={themeChangeHandler}
      >
        {theme === "dark" ? <TbSunFilled /> : <TbMoonFilled />}
      </button>
    </div>
  );
};

export default ThemeToggle;
