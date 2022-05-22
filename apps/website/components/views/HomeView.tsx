import { RightArrow } from "css.gg";

import { Link } from "../Link";
import { ViewHeading } from "./ViewHeading";

const packages = [
  [
    "@cnc4me/chrysalis",
    "A thin wrapper around the Monaco editor to enable easy customization."
  ],
  ["@cnc4me/fanuc-macro-b", "A complete environment "],
  [
    "@cnc4me/monaco-theme-gcode",
    "Custom theme for Monarch and the Monaco Editor"
  ],
  [
    "@cnc4me/monaco-language-gcode",
    "Custom language for Monarch and the Monaco Editor"
  ]
];

export const HomeView = () => {
  return (
    <div className="container bg-neutral-800">
      {/* <ViewHeading value="Welcome" /> */}
      <div className="flex flex-col px-8 pt-4">
        <p className="px-2 py-2 text-violet-300">
          <span className="text-2xl">Welcome</span> to the Fanuc Macro B online
          playground.
        </p>
        <p className="px-2 py-2 text-violet-300">
          This is a virtual environment for executing partial or full programs
          with evaluation of macro expressions.
        </p>
        <p className="px-2 py-2 text-violet-300">
          It was created with the goal of letting an operator view how a macro
          program might execute in the machine, without interrupting production.
        </p>
        <h3 className="my-2 text-2xl border-b text-violet-500 border-b-violet-700">
          View Samples In The Editor
        </h3>
        <div className="pl-4">
          <ul className="list-none">
            <li className="py-1 hover:list-disc text-violet-300">
              <Link href="/?tab=macros&content=BQAgagggSgkhBCAZAoiCBldMDiA5AssrgCrogCUAUAMQCMAvAMwB0tALLQKwCcATAGyc2lSqAiJsyeFAgUavegG1aAal4BdAFSMRoSLAQoQ6AKrx0xGMROWA8rjJVqjetV4B6OrpDSIAYQBpZGIQZEhEEwg7BzlqNiU2TTd1AFodak4lfhVnHI13RTiU5O94ExhEYhSYXBAAMRNcP2jHGn56BHRFFN5mRk5aDRoAdnp0AEUoYkU2bnUaAA56KFtGgBFC2nnqbnoGgAVN9SA">
                Macro Variables & Functions
              </Link>
            </li>
            <li className="py-1 hover:list-disc text-violet-300">
              <Link href="/?tab=tools&content=BQAg8gSiBikgKmMAZc1oGUCi8MEoQAoAcQEYAGEYgTkuVNJAAVGIBmAOlICY2BWEhSq0Q9SixAQOAspRp1SbZqwC0HcuW4yh80T2WS1G0oLkj6jJt0l8ObUgDZup4QvHWpbAOzazCpVaS6uQ8Lrr01oHsXLy%2BrnqWShDcdrRsYeZCTEmkHBn%2BzEl2Pvl6kUUaACxAA">
                G10 Lines with Tool Offsets
              </Link>
            </li>
            <li className="py-1 hover:list-disc text-violet-300">
              <Link href="/?tab=offsets&content=BQAgogagggMiDiBGADCGBJAcmAyiAYgPIBKIA6iQNIiH745gAqeAlCAFBKrwCcqMAJhAAFRCAAaiAHQCAzABYArCACaPKQA4A7ADZlALQC0GqTq2LZIAEICtyKZxQI%2BaIcKHj5pufNWzNAkogRloyAsi%2BVnwOXM78bpbihv6IGjxaqgLSyLICBopSPDza1qn27EA">
                G10 Lines with Work Offsets
              </Link>
            </li>
            <li className="py-1 hover:list-disc text-violet-300">
              <Link href="/?tab=home&content=KQWAUA8gjATAzAFgAQAokBUASBJAykvJAQQDkkBRADSIFkAFAGXKQEpw0BhCGm8k9VuyRcefAWzCduvfoLDh0MAKxIaABgBsqKAHoYAImFEASgCFsAEWZwAYgwF8LNbAwYT1UbXsMcT5q0i29hQkTi5u4ADiampIkQCcsZFKyJQAdMpIAJppCOC4AOxKMapqcFEIcEiYmQBaUGkYMBpRJbVqaVDg6gAcrZ61ALS5SDYwHf3Zgw15YNGx9WndavHLSlHxnpEwPUjtS2A0cGrgQA">
                Milling In Y
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden w-auto px-10 py-5 ">
          <h3 className="pb-4 text-2xl text-purple-500">Packages</h3>
          <div className="flex grid-cols-2 gap-5">
            {packages.map(([repoId, desc]) => {
              const href = `https://github.com/cnc4me/${repoId.split("/")[1]}`;

              return (
                <div key={repoId} className="flex justify-center">
                  <div className="block text-center bg-white rounded-lg shadow-lg">
                    <div className="p-6">
                      <h5 className="mb-2 text-xl font-medium text-gray-900">
                        {repoId}
                      </h5>
                      <p className="mb-4 text-base text-gray-700">{desc}</p>
                      <button
                        type="button"
                        className=" inline-block px-6 py-2.5 bg-violet-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        <a className="text-white" href={href}>
                          View on Github
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div className="p-2 border border-purple-500"></div> */}
    </div>
  );
};
