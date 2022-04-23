import { ViewHeading } from "./ViewHeading";

export const HomeView = () => {
  return (
    <div className="container flex flex-col">
      <ViewHeading value="Home" />
      <div className="flex flex-row">
        <div className="pt-5">
          <p className="px-10 py-5 text-blue-300">Hello and welcome to the Fanuc Macro B online playground.</p>
          <p className="px-10 py-5 text-violet-400">
            This is a virtual environment for executing partial or full programs with evaluation of macro expressions.
          </p>
          <p className="px-10 py-5 text-purple-300">
            It was created with the goal of letting an operator view how a macro program might execute in the machine,
            without interupting production.
          </p>
        </div>
        {/* <div className="border-purple-500 border p-2"></div> */}
      </div>
    </div>
  );
};
