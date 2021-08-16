import React from "react";
import colors from "./../resources/colors";

export default function SearchItem({ data, focus = false, onHover, onClick }) {
  const { station_name, line_number } = data;
  const defaultStyle = {
    color: "black",
    marginBottom: "20px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  };
  const focusStyle = {
    borderBottom: "1px solid #111",
    boxSizing: "border-box",
    paddingBottom: "2px",
    cursor: "pointer",
  };
  const lineStyle = {
    backgroundColor: colors.metro[line_number],
    color: "white",
    fontSize: "14px",
    padding: "4px 12px",
    borderRadius: "14px",
    display: "inlime-block",
    marginRight: "8px",
    textAlign: "center",
    fontWeight: "normal",
  };

  return (
    <div style={defaultStyle} onMouseOver={onHover} onMouseDown={onClick}>
      <span style={lineStyle}>{line_number}</span>
      <span style={{ ...(focus && focusStyle) }}>{station_name}</span>
    </div>
  );
}
