import "./components/style.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

interface Color {
  name: string;
  color_hex: string;
  svg_linear_grad: string;
  stop1: string;
  stop2: string;
  btn_linear_grad?: string;
}
let colors: Color[] = [
  {
    name: "black",
    color_hex: "#000000",
    svg_linear_grad: "url(#linear-gradient-black)",
    stop1: "#000000",
    stop2: "#000000",
    btn_linear_grad: "linear-gradient(to bottom right, #000000, #000000)",
  },
  {
    name: "brown",
    color_hex: "#5c2211",
    svg_linear_grad: "url(#linear-gradient-brown)",
    stop1: "#5c2211",
    stop2: "#5c2211",
    btn_linear_grad: "linear-gradient(to bottom right, #5c2211, #5c2211)",
  },
  {
    name: "red",
    color_hex: "#d10808",
    svg_linear_grad: "url(#linear-gradient-red)",
    stop1: "#d10808",
    stop2: "#d10808",
    btn_linear_grad: "linear-gradient(to bottom right, #d10808, #d10808)",
  },
  {
    name: "orange",
    color_hex: "#d9770f",
    svg_linear_grad: "url(#linear-gradient-orange)",
    stop1: "#d9770f",
    stop2: "#d9770f",
    btn_linear_grad: "linear-gradient(to bottom right, #d9770f, #d9770f)",
  },
  {
    name: "yellow",
    color_hex: "#dbb81d",
    svg_linear_grad: "url(#linear-gradient-yellow)",
    stop1: "#dbb81d",
    stop2: "#dbb81d",
    btn_linear_grad: "linear-gradient(to bottom right, #dbb81d, #dbb81d)",
  },
  {
    name: "green",
    color_hex: "#2d9119",
    svg_linear_grad: "url(#linear-gradient-green)",
    stop1: "#2d9119",
    stop2: "#2d9119",
    btn_linear_grad: "linear-gradient(to bottom right, #2d9119, #2d9119)",
  },
  {
    name: "blue",
    color_hex: "#143bba",
    svg_linear_grad: "url(#linear-gradient-blue)",
    stop1: "#143bba",
    stop2: "#143bba",
    btn_linear_grad: "linear-gradient(to bottom right, #143bba, #143bba)",
  },
  {
    name: "violet",
    color_hex: "#8c0da6",
    svg_linear_grad: "url(#linear-gradient-violet)",
    stop1: "#8c0da6",
    stop2: "#8c0da6",
    btn_linear_grad: "linear-gradient(to bottom right, #8c0da6, #8c0da6)",
  },
  {
    name: "grey",
    color_hex: "#858585",
    svg_linear_grad: "url(#linear-gradient-grey)",
    stop1: "#858585",
    stop2: "#858585",
    btn_linear_grad: "linear-gradient(to bottom right, #858585, #858585)",
  },
  {
    name: "white",
    color_hex: "#ededed",
    svg_linear_grad: "url(#linear-gradient-white)",
    stop1: "#ededed",
    stop2: "#ededed",
    btn_linear_grad: "linear-gradient(to bottom right, #ededed, #ededed)",
  },
  {
    name: "gold",
    color_hex: "#FCDB21",
    svg_linear_grad: "url(#linear-gradient-gold)",
    stop1: "#FCDB21",
    stop2: "#DBAB00",
    btn_linear_grad:
      "linear-gradient(to bottom right, #E6E6E6, #FCDB21, #DBAB00,#FCDB21)",
  },
  {
    name: "silver",
    color_hex: "#e6e6e6",
    svg_linear_grad: "url(#linear-gradient-silver)",
    stop1: "#e6e6e6",
    stop2: "#c3c3c3",
    btn_linear_grad:
      "linear-gradient(to bottom right, #C3C3C3, #E6E6E6, #C3C3C3)",
  },
];
const ResistorApp = () => {
  const [band1, band1_u] = useState("#e8da93");
  const [band2, band2_u] = useState("#e8da93");
  const [band3, band3_u] = useState("#e8da93");
  const [band4, band4_u] = useState("#e8da93");
  ///////
  let [band1Value, band1Value_u] = useState(0);
  let [band2Value, band2Value_u] = useState(0);
  let [band3Value, band3Value_u] = useState(0);
  let [band4Value, band4Value_u] = useState(0);
  let [btnState, btnState_u] = useState([0, 0, 0, 0]);

  let [outputText, outputText_u] = useState("");
  //////////////
  const fourthInv = ["#000000", "#ededed"];
  const cols = ["col1", "col2"];

  const CalculateOhm = () => {
    if (btnState.includes(0)) {
      return;
    }

    let thirdBandPairs = {
      "0": 1,
      "1": 10,
      "2": 10 ** 2,
      "3": 10 ** 3,
      "4": 10 ** 4,
      "5": 10 ** 5,
      "6": 10 ** 6,
      "7": 10 ** 7,
      "8": 10 ** 8,
      "9": 10 ** 9,
      "10": 10 ** -1,
      "11": 10 ** -2,
    };
    let fourthBandPairs = {
      "0": "±1%",
      "1": "±2%",
      "2": "±3%",
      "3": "±4%",
      "4": "±0.5%",
      "5": "±0.25%",
      "6": "±0.1%",
      "7": "±0.05%",
      "8": "±5%",
      "9": "±10%",
    };
    let result = parseFloat(
      (
        (band1Value * 10 + band2Value) *
        thirdBandPairs[band3Value.toString() as keyof typeof thirdBandPairs]
      ).toFixed(2)
    );
    let convResult = "";
    let formatter = () => {
      if (result >= 10 ** 3 && result < 10 ** 6) {
        result = result / 10 ** 3;
        convResult = result.toString() + "K";
      } else if (result >= 10 ** 6 && result < 10 ** 9) {
        result = result / 10 ** 6;
        convResult = result.toString() + "M";
      } else if (result >= 10 ** 9 && result < 10 ** 12) {
        result = result / 10 ** 9;
        convResult = result.toString() + "G";
      } else {
        convResult = result.toString();
      }
    };
    formatter();
    outputText_u(
      convResult.toString() +
        `Ω ${
          fourthBandPairs[band4Value.toString() as keyof typeof fourthBandPairs]
        }`
    );
  };
  const ChangeBtnState = (index: number, state: number) => {
    let newBtnState = btnState.slice();
    newBtnState[index] = state;
    btnState_u(newBtnState);
    console.log(btnState);
  };
  const RenderButton = (
    column: number,
    val_button: number,
    color_btn: string
  ) => {
    if (column == 0) {
      band1_u(color_btn);
      band1Value_u(val_button);
    } else if (column == 1) {
      band2_u(color_btn);
      band2Value_u(val_button);
    } else if (column == 2) {
      band3_u(color_btn);
      band3Value_u(val_button);
    } else if (column == 3) {
      band4_u(color_btn);
      band4Value_u(val_button);
    }
  };
  // const HideButn = () => {};
  useEffect(() => {
    CalculateOhm();
  }, [band1, band2, band3, band4]);
  return (
    <>
      <div className="main">
        <div className="l1">
          <div className="resistorDIV">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1500.26 32.87"
              className="wire_tin"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="linear-gradient-wire"
                  x1="741.7"
                  y1="161.02"
                  x2="756.12"
                  y2="-86.28"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#c4c4c4" />
                  <stop offset=".34" stopColor="#585858" />
                  <stop offset=".66" stopColor="#c4c4c4" />
                  <stop offset=".95" stopColor="#585858" />
                </linearGradient>
              </defs>
              <rect className="wire-grad " width="1500.26" height="32.87" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="resistor"
              viewBox="0 0 691.95 277.18"
            >
              <defs>
                <style></style>
                <linearGradient
                  id="linear-gradient-shadow"
                  x1="345.97"
                  y1="339.3"
                  x2="345.97"
                  y2="200.73"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#42210b" />
                  <stop offset=".17" stopColor="#42210b" stopOpacity=".74" />
                  <stop offset=".49" stopColor="#42210b" stopOpacity=".33" />
                  <stop offset=".78" stopColor="#42210b" stopOpacity=".09" />
                  <stop offset="1" stopColor="#42210b" stopOpacity="0" />
                </linearGradient>

                {colors.map((element) => (
                  <linearGradient
                    id={element.svg_linear_grad.slice(
                      5,
                      element.svg_linear_grad.length - 1
                    )}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                    gradientTransform="rotate(65)"
                  >
                    <stop
                      offset="0"
                      stopColor={element.stop1}
                      stopOpacity="1"
                    />
                    <stop
                      offset=".25"
                      stopColor={element.stop2}
                      stopOpacity="1"
                    />
                    <stop
                      offset=".5"
                      stopColor={element.stop1}
                      stopOpacity="1"
                    />
                    <stop
                      offset=".75"
                      stopColor={element.stop2}
                      stopOpacity="1"
                    />
                    <stop
                      offset="1"
                      stopColor={element.stop1}
                      stopOpacity="1"
                    />
                  </linearGradient>
                ))}
              </defs>
              <path
                className="resistor_color"
                d="m213.12,29.53c-12.93,0-25.74-2.49-37.73-7.33l-1.64-.66v234.11l19.8-7.99h0s32.55,0,32.55,0V29.53h-12.97Z"
              />
              <path
                className="resistor_color"
                d="m478.83,29.53h-75.56v218.12h85.91V28.99c-3.43.35-6.88.54-10.34.54Z"
              />
              <rect
                className="resistor_color"
                x="288.5"
                y="29.53"
                width="52.35"
                height="218.12"
              />
              <path
                className="resistor_color"
                d="m100.8,0h0C45.13,0,0,45.13,0,100.8v75.57c0,55.67,45.13,100.8,100.8,100.8h0c3.52,0,7.03-.19,10.52-.56V.56c-3.49-.37-7-.56-10.52-.56Z"
              />
              <path
                className="resistor_color"
                d="m591.14,0h0c-12.93,0-25.74,2.49-37.73,7.33l-1.82.73v261.06l1.82.73c11.99,4.84,24.8,7.33,37.73,7.33h0c55.67,0,100.8-45.13,100.8-100.8v-75.57c0-55.67-45.13-100.8-100.8-100.8Z"
              />
              <path
                fill={band1}
                d="m138.54,7.33c-8.73-3.52-17.89-5.79-27.22-6.77v276.07c9.33-.98,18.49-3.25,27.22-6.77l35.2-14.21V21.54l-35.2-14.21Z"
                className="resTrans"
              />
              <rect
                fill={band2}
                x="226.09"
                y="29.53"
                width="62.42"
                height="218.12"
                className="resTrans"
              />
              <polygon
                fill={band3}
                className="resTrans"
                points="345.97 29.53 340.85 29.53 340.85 247.65 345.97 247.65 403.27 247.65 403.27 29.53 345.97 29.53"
              />
              <path
                fill={band4}
                className="resTrans"
                d="m516.56,22.2c-8.78,3.54-18,5.82-27.39,6.79v218.66h9.23s53.18,21.47,53.18,21.47V8.06l-35.03,14.14Z"
              />
              <path
                className="resistor_gradient"
                d="m.76,188.75c6.1,49.84,48.56,88.43,100.05,88.43h0c3.52,0,7.03-.19,10.52-.56,9.33-.98,18.49-3.25,27.22-6.77l35.2-14.21,19.8-7.99h0s32.55,0,32.55,0h272.32s53.18,21.47,53.18,21.47l1.82.73c11.99,4.84,24.8,7.33,37.73,7.33h0c51.48,0,93.95-38.6,100.05-88.43H.76Z"
              />
            </svg>
          </div>
          <div>
            <h1 className="output">{outputText}</h1>
          </div>
        </div>
        <div className="l2">
          <div className="interface">
            {cols.map((col, colInd) => (
              <div
                className="colBtn"
                key={"digits" + col}
                style={{ marginTop: 0 }}
              >
                {colors.slice(0, 10).map((u, i) => (
                  <button
                    type="button"
                    key={i.toString() + "_" + colInd.toString()}
                    className="colorBtn"
                    onClick={() => {
                      ChangeBtnState(colInd, 1);
                      RenderButton(colInd, i, u.color_hex);
                    }}
                    style={{ backgroundColor: u.color_hex }}
                  ></button>
                ))}
              </div>
            ))}
            <div className="colBtn" key={"multiplier"} style={{ marginTop: 0 }}>
              {colors.map((u, i) =>
                i > 9 ? (
                  <button
                    type="button"
                    key={i.toString() + "_" + "multiplier"}
                    className="colorBtn"
                    onClick={() => {
                      ChangeBtnState(btnState.length - 2, 1);
                      RenderButton(btnState.length - 2, i, u.svg_linear_grad);
                    }}
                    style={{ backgroundImage: u.btn_linear_grad }}
                  ></button>
                ) : (
                  <button
                    type="button"
                    key={i.toString() + "_" + "multiplier"}
                    className="colorBtn"
                    onClick={() => {
                      ChangeBtnState(btnState.length - 2, 1);
                      RenderButton(btnState.length - 2, i, u.color_hex);
                    }}
                    style={{ backgroundColor: u.color_hex }}
                  ></button>
                )
              )}
            </div>
            <div className="colBtn" key={"tolerance"} style={{ marginTop: 0 }}>
              {colors
                .filter((x) => {
                  return !fourthInv.includes(x.color_hex);
                })
                .map((u, i) =>
                  i > 7 ? (
                    <button
                      type="button"
                      key={i.toString() + "_" + "tolerance"}
                      className="colorBtn"
                      onClick={() => {
                        ChangeBtnState(btnState.length - 1, 1);
                        RenderButton(btnState.length - 1, i, u.svg_linear_grad);
                      }}
                      style={{
                        backgroundImage: u.btn_linear_grad,
                      }}
                    ></button>
                  ) : (
                    <button
                      type="button"
                      key={i.toString() + "_" + "tolerance"}
                      className="colorBtn"
                      onClick={() => {
                        ChangeBtnState(btnState.length - 1, 1);
                        RenderButton(btnState.length - 1, i, u.color_hex);
                      }}
                      style={{ backgroundColor: u.color_hex }}
                    ></button>
                  )
                )}
            </div>
          </div>
        </div>
        {/* <div>HELLOOOOOOo</div> */}
      </div>
    </>
  );
};

export default ResistorApp;
