import "../css/Header.css"

function Header() {
  return (
    <>
      <header className="d-flex justify-content-center align-items-center w-100 py-2">
        <span className="first">🎬</span>
        <span className="text-light title">Movie App</span>
        <span className="second">🎥</span>
      </header>
    </>
  );
}

export default Header;
