import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ size = "text-xl" }) {
  return <BiLoaderAlt className={`animate-spin ${size}`} />;
}

export default SpinnerMini;
