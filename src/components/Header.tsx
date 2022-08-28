/* This example requires Tailwind CSS v2.0+ */
export const Header = () => {
  return (
    <header className="relative bg-sky-800">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1613645695025-20e3f38de4a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt=""
        />
        <div
          className="absolute inset-0 bg-sky-800 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Beautiful State Machines
        </h1>
        <p className="mt-6 text-xl text-sky-100 max-w-3xl">
          XState Catalogue is a collection of professionally designed state
          machines you can drop into your projects. Get started by browsing the
          catalogue, interacting with the machines, and copying the code.
        </p>
      </div>
    </header>
  );
};
