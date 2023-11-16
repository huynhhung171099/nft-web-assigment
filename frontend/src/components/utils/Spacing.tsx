function Spacing({ h = "0px", w = "0px" }) {
  return (
    <div
      style={{
        minHeight: h,
        minWidth: w,
        display: "block",
      }}
    >
      <span></span>
    </div>
  );
}

export default Spacing;
