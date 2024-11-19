function Home() {
  return (
    <main className="container flex flex-col gap-4 py-8 mx-auto">
      <h1>Test Tasks</h1>
      <ul>
        <li>
          <a
            href="http://https://github.com/denizkose"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 font-semibold text-white transition duration-300 bg-black rounded-md hover:bg-gray-800"
          >
            Github
          </a>
        </li>
      </ul>
    </main>
  );
}

export default Home;
