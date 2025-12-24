import { DocumentTextIcon, LightBulbIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";
import { EncodedLink } from "~/components/EncodedLink";

const packages = [
  [
    "@cnc4me/chrysalis",
    "A thin wrapper around the Monaco editor to enable easy customization.",
  ],
  [
    //
    "@cnc4me/fanuc-macro-b",
    "A complete environment for Fanuc Macro B evaluation.",
  ],
  [
    "@cnc4me/monaco-gcode",
    "Custom theme and language for Monarch and the Monaco Editor.",
  ],
];

export default function HomeView() {
  return (
    <div className="container bg-neutral-800">
      {/* <ViewHeading value="Welcome" /> */}
      <div className="flex flex-col px-8 pt-4">
        <h3 className="mt-4 text-3xl text-violet-300">
          <LightBulbIcon className="inline-block h-8 mb-2 mr-2" />
          Fanuc Macro B
        </h3>
        <p className="px-2 py-2 text-violet-500">
          This is a virtual environment for executing partial or full programs
          with evaluation of macro expressions.
        </p>
        <p className="px-2 py-2 text-violet-500">
          It was created with the goal of letting an operator view how a macro
          program might execute in the machine, without interrupting production.
        </p>

        <h3 className="mt-8 text-3xl text-violet-300">
          <DocumentTextIcon className="inline-block h-8 mb-2 mr-2" />
          View Samples In The Editor
        </h3>
        <div className="pl-7">
          <ul className="list-disc">
            <li className="py-1 pl-4 text-violet-300">
              <EncodedLink
                tab="macros"
                label="Macro Variables & Functions"
                content="BQAgagggSgkhBCAZAoiCBldMDiA5AssrgCrogCUAUAMQCMAvAMwB0tALLQKwCcATAGyc2lSqAiJsyeFAgUavegG1aAal4BdAFSMRoSLAQoQ6AKrx0xGMROWA8rjJVqjetV4B6OrpDSIAYQBpZGIQZEhEEwg7BzlqNiU2TTd1AFodak4lfhVnHI13RTiU5O94ExhEYhSYXBAAMRNcP2jHGn56BHRFFN5mRk5aDRoAdnp0AEUoYkU2bnUaAA56KFtGgBFC2nnqbnoGgAVN9SA"
              />
            </li>
            <li className="py-1 pl-4 text-violet-300">
              <EncodedLink
                tab="tools"
                label="G10 Lines with Tool Offsets"
                content="BQAg8gSiBikgKmMAZc1oGUCi8MEoQAoAcQEYAGEYgTkuVNJAAVGIBmAOlICY2BWEhSq0Q9SixAQOAspRp1SbZqwC0HcuW4yh80T2WS1G0oLkj6jJt0l8ObUgDZup4QvHWpbAOzazCpVaS6uQ8Lrr01oHsXLy%2BrnqWShDcdrRsYeZCTEmkHBn%2BzEl2Pvl6kUUaACxAA"
              />
            </li>
            <li className="py-1 pl-4 text-violet-300">
              <EncodedLink
                tab="offsets"
                label="G10 Lines with Work Offsets"
                content="BQAgogagggMiDiBGADCGBJAcmAyiAYgPIBKIA6iQNIiH745gAqeAlCAFBKrwCcqMAJhAAFRCAAaiAHQCAzABYArCACaPKQA4A7ADZlALQC0GqTq2LZIAEICtyKZxQI%2BaIcKHj5pufNWzNAkogRloyAsi%2BVnwOXM78bpbihv6IGjxaqgLSyLICBopSPDza1qn27EA"
              />
            </li>
            <li className="py-1 pl-4 text-violet-300">
              <EncodedLink
                tab="home"
                label="Milling In Y"
                content="KQWAUA8gjATAzAFgAQAokBUASBJAykvJAQQDkkBRADSIFkAFAGXKQEpw0BhCGm8k9VuyRcefAWzCduvfoLDh0MAKxIaABgBsqKAHoYAImFEASgCFsAEWZwAYgwF8LNbAwYT1UbXsMcT5q0i29hQkTi5u4ADiampIkQCcsZFKyJQAdMpIAJppCOC4AOxKMapqcFEIcEiYmQBaUGkYMBpRJbVqaVDg6gAcrZ61ALS5SDYwHf3Zgw15YNGx9WndavHLSlHxnpEwPUjtS2A0cGrgQA"
              />
            </li>
            <li className="py-1 pl-4 text-violet-300">
              <EncodedLink
                tab="home"
                label="Syntax Highlighting"
                content="NwAgYgMgggag8gJQFwgLIEMBOAbAlgOwChQJ0BPAU0xAAsLcBzGgFxQAYA6AFmLQEkAcgA0UAJgDMHABwBOAOy9UggJpjJshaFRQhIkAFZOANi48tO1QeOneAcQr4q6ZhQAmIAO65mNEAGEAV0x0EABlF3QAWwBRfAYCChAuDgBGSRTeOAAFABU%2BOAEoCBAshDhbBChUEAARaNC-BD5c-IEQRH84VFRogRzCQlQUti4w0TY2QeH9KbYZMYnBqVEQUHQAIwBnAHtsAJcQCgAPZkwAzdxt-BBI7dcKQltRKVXabcjE9GxsEHQjik2jxSIAAWil9Bw2OAjBMoaBbgA3RI%2BRIAB2wzgAZttMJEQK5th5ruDIpEBrZgWBxlDouJCAB1AASfAg0RAAG0AMZXVzeS74L4AXUINTgIDpfDAHIAxMMaQBFEBsQUgWxwHJilLDR7qsXU3ihd6JWwAWm591oVAevRqA1ACAop3QnOYIBRIExuAxH3wzEeMhW0UmQxGYWDKS4UNC4bYClQUlGoF5mw22ESt2YOMBoFi7m2mNVZruDyAA"
              />
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
}
