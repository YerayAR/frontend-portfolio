import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: '70px' }}>{children}</main>
      <Footer />
    </>
  );
}
