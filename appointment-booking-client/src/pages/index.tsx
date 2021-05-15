export default function home() {
  console.log("hello")
  console.log(process.env.NEXT_PUBLIC_API_URI)
  return <h1>Home</h1>;
}

home.displayName = "home";
