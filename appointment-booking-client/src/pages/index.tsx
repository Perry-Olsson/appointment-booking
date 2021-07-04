import { SuccessMark } from "../components";

export default function home() {
  return (
    <>
      <h1
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        Home
      </h1>
      <SuccessMark />
    </>
  );
}

home.displayName = "home";
