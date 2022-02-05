import { evaluate, validate } from "../src/utils";

const code = `%
#850=.875
(FIRST THRU HOLE Y LOC:)
#851=.790
(FLAT BOTTOM HOLE Y LOC:)
#855=0.730
(SPREAD DISTANCE:)
#852=5.9371
(FINISH LENGTH:)
#853=43.3104
%`;

try {
  const { macros, parseErrors } = evaluate(code);

  console.log(parseErrors);
  console.log(macros.get(850));
  console.log(macros.get(851));
} catch (err) {
  console.log(err);
}

// for (const macro of macros) {
//   if (macro[1]) {
//     console.log(macro);
//   }
// }
