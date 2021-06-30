import { FC, useEffect } from "react";
import Vivus from "vivus";

export const SuccessMark: FC = () => {
  useEffect(() => {
    new Vivus("check", { duration: 200, type: "oneByOne" });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      <svg
        id="check"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 640 640"
        width="300"
        height="300"
      >
        <defs>
          <path
            d="M420 320C420 375.19 375.19 420 320 420C264.81 420 220 375.19 220 320C220 264.81 264.81 220 320 220C375.19 220 420 264.81 420 320Z"
            id="e1rI4OsoDw"
          ></path>
          <path
            d="M378.9 277.09L311.18 374.72L260 311.73"
            id="a24dOpJ8WM"
          ></path>
        </defs>
        <g>
          <g>
            <g>
              <g>
                <use
                  xlinkHref="#e1rI4OsoDw"
                  opacity="1"
                  fill-opacity="0"
                  stroke="#24ff00"
                  stroke-width="12"
                  stroke-opacity="1"
                ></use>
              </g>
            </g>
            <g>
              <g>
                <use
                  xlinkHref="#a24dOpJ8WM"
                  opacity="1"
                  fill-opacity="0"
                  stroke="#00ff2d"
                  stroke-width="12"
                  stroke-opacity="1"
                ></use>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
