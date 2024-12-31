import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const Loader = (props: { statusMessage: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      {props.statusMessage?props.statusMessage:null}
    </div>
  );
};

export default Loader;
