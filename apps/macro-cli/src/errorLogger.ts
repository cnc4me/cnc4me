import { MacroProgramLoaded } from "@cnc4me/fanuc-macro-b";

export default function errorLogger(): MacroProgramLoaded {
  return err => {
    if (err) {
      console.log(err);
    }
  };
}
