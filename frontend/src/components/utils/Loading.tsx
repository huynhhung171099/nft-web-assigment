import { IconRobotFace } from "@tabler/icons-react";

const Loading = ({
  visible = true,
  blur = false,
}: {
  visible?: boolean;
  blur?: boolean;
}) => {
  // Note that position: relative is required
  return visible ? (
    <>
      {blur ? (
        <div className="absolute backdrop-blur-sm w-full h-full" />
      ) : (
        <></>
      )}
      <div
        style={{
          top: "45%",
        }}
        className="absolute z-50 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-purple-500"></div>
        <IconRobotFace color="white" width={45} height={45} />
      </div>
    </>
  ) : (
    <></>
  );
};
export default Loading;
