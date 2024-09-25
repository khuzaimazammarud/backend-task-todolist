import Header from "./header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
