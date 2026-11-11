export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // fill .content-wrapper: its min-height minus its vertical padding
        minHeight: 'calc(100vh - 260px)',
      }}
    >
      <h1 style={{ margin: 0 }}>404</h1>
    </div>
  );
}
