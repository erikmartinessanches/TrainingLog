export default function HeaderView() {
  return (
    <div>
      <header className="App-header">
        {import.meta.env.VITE_APP_APP_NAME}
      </header>
    </div>
  );
}
