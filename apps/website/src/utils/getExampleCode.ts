export function getExampleCode() {
  return [
    "( VARIABLE ASSIGNMENTS )",
    "#1=3.141592654",
    "",
    "( ALGEBRA )",
    "#2=[1+2]*3",
    "",
    "( VARIABLE SUBSTITUTIONS )",
    "#3=#2/#1",
    "#4=[4*#2]-3",
    "#5=[6+#3+#2]/[#4-#2]",
    "",
    "( BUILT-IN FUNCTIONS )",
    "#6=ABS[-2.3512]",
    "#7=SQRT[49]",
    "#8=ROUND[#1]",
    "#9=FUP[#1]",
    "",
    "( EVAL G10 LINES) ",
    "G10 G90 L2 P1 X1.2345 Y9.8765 Z-8.6753 B270.",
    "G10 G90 L2 P2 X4.6234 Y3.8245 Z-7.2204 B90.",
    "",
    "( ... AND MORE! ) ",
    ""
  ].join("\n");
}
