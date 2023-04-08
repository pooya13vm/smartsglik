import { View } from "react-native";
import { Svg, Line, G, Rect } from "react-native-svg";
import { colors } from "../assets/utility/colors";

const VoiceSVG = ({ svgHeight }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Svg
        height="100"
        width="300"
        style={{
          justifyContent: "center",
          transform: [{ rotate: "180deg" }],
        }}
      >
        <G fill={colors.linkText} stroke={colors.linkText} strokeWidth={3}>
          <Rect
            rx="5"
            width="14"
            y="-2"
            x="20"
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            height={svgHeight / 4}
          />
          <Rect
            rx="5"
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            height={svgHeight / 3}
            width="15"
            y="-2"
            x="40"
          />
          <Rect
            rx="5"
            height={svgHeight / 2}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="60"
          />
          <Rect
            rx="5"
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            height={svgHeight / 1}
            width="15"
            y="-2"
            x="80"
          />
          <Rect
            rx="5"
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            height={svgHeight / 2}
            width="15"
            y="-2"
            x="100"
          />
          <Rect
            rx="5"
            height={svgHeight / 3}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="120"
          />
          <Rect
            rx="5"
            height={svgHeight / 4}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="140"
          />
          <Rect
            rx="5"
            height={svgHeight / 3}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="160"
          />
          <Rect
            rx="5"
            height={svgHeight / 2}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="180"
          />
          <Rect
            rx="5"
            height={svgHeight / 1}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="200"
          />
          <Rect
            rx="5"
            height={svgHeight / 2}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="220"
          />
          <Rect
            rx="5"
            height={svgHeight / 3}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="240"
          />
          <Rect
            rx="5"
            height={svgHeight / 4}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="260"
          />
        </G>
      </Svg>
      <Svg height="2" width="300">
        <Line
          x1="0"
          y1="2"
          x2="300"
          y2="2"
          stroke={colors.linkText}
          strokeWidth={10}
        />
      </Svg>
      <Svg
        height="100"
        width="300"
        style={{
          justifyContent: "center",
        }}
      >
        <G fill={colors.linkText} stroke={colors.linkText} strokeWidth={3}>
          <Rect
            rx="5"
            width="14"
            y="-2"
            x="25"
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            height={svgHeight / 4}
          />
          <Rect
            rx="5"
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            height={svgHeight / 3}
            width="15"
            y="-2"
            x="45"
          />
          <Rect
            rx="5"
            height={svgHeight / 2}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="65"
          />
          <Rect
            rx="5"
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            height={svgHeight / 1}
            width="15"
            y="-2"
            x="85"
          />
          <Rect
            rx="5"
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            height={svgHeight / 2}
            width="15"
            y="-2"
            x="105"
          />
          <Rect
            rx="5"
            height={svgHeight / 3}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="125"
          />
          <Rect
            rx="5"
            height={svgHeight / 4}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="145"
          />
          <Rect
            rx="5"
            height={svgHeight / 3}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="165"
          />
          <Rect
            rx="5"
            height={svgHeight / 2}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="185"
          />
          <Rect
            rx="5"
            height={svgHeight / 1}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="205"
          />
          <Rect
            rx="5"
            height={svgHeight / 2}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="225"
          />
          <Rect
            rx="5"
            height={svgHeight / 3}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="245"
          />
          <Rect
            rx="5"
            height={svgHeight / 4}
            // height={svgHeight / Math.floor(Math.random() * 4) + 1}
            width="15"
            y="-2"
            x="265"
          />
        </G>
      </Svg>
    </View>
  );
};
export default VoiceSVG;
