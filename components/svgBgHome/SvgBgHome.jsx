import { Text, View } from "react-native";
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";
const SvgBgHome = () => {
  return (
    <View
      style={[
        {
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundColor: "#f58484",
        },
        {
          transform: [{ translateY: 0 }],
        },
      ]}
    >
      <Svg
        height="100%"
        preserveAspectRatio="xMinYMin slice"
        width="100%"
        viewBox="0 0 100 100"
      >
        <Polygon points="0,20 100,0 100,25 0,45" fill={"red"} />
      </Svg>
    </View>
  );
};

export default SvgBgHome;
