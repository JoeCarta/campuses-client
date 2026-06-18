function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-xl font-semibold">campuses & students</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-3xl font-bold">welcome</h2>
        <p className="mt-2 text-slate-600">
          manage campuses and the students enrolled at them.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="#"
            className="rounded-lg border bg-white p-6 hover:border-slate-400"
          >
            <h3 className="font-semibold">campuses</h3>
            <p className="mt-1 text-sm text-slate-600">browse all campuses</p>
          </a>
          <a
            href="#"
            className="rounded-lg border bg-white p-6 hover:border-slate-400"
          >
            <h3 className="font-semibold">students</h3>
            <p className="mt-1 text-sm text-slate-600">browse all students</p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default App
