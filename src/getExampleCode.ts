export function getExampleCode() {
  return [
    "( VARIABLE ASSIGNMENTS )",
    "#1=3.141592654",
    "( ALGEBRA )",
    "#2=[1+2]*3",
    "( VARIABLE SUBSTITUTIONS )",
    "#3=#2/#1",
    "#4=[4*#2]-3",
    "#5=[6+#3+#2]/[#4-#2]",
    "( BUILT-IN FUNCTIONS )",
    "#6=ABS[-2.3512]",
    "#7=SQRT[49]",
    "#8=ROUND[#1]",
    "#9=FUP[#1]",
    "( ... AND MORE! ) ",
    ""
  ].join("\n");
}
