export default function PortfolioPage() {
  return (
    <iframe
      src="https://lso-lsd-ppt.vercel.app/"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        zIndex: 9999,
      }}
      allowFullScreen
    />
  );
}
