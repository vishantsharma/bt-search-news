function Header() {
    return (
        <header className="header">
            <div className="main-container">
                <img src="bt-icon.svg" alt="BT Logo" className="bt-logo" />
                <h1>BT News</h1>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="main-container">
                <h1> BT React Code Test - by Vishant Sharma - 15/05/21 </h1>
            </div>
        </footer>
    );
}

function GetNews() {
    const [apiData, setApiData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState("");
    const [userInput, setUserInput] = React.useState("");

    async function getArticles(userInput) {
        setIsLoading("Loading...");
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${userInput}&apiKey=34fa02f7f8034546aa8355f34d1913c8`
        );
        const data = await response.json();
        console.log(data)
        setApiData(data.articles.slice(0, 10));
        if (data.totalResults > 0) {
            setIsLoading("");
        } else {
            setIsLoading("Nothing found!!");
        }
    }

    return (
        <div className="main-container">
            <InputField
                getArticles={getArticles}
                userInput={userInput}
                setUserInput={setUserInput}
                setIsLoading={setIsLoading}
            />
            <NewsResults
                apiData={apiData}
                isLoading={isLoading}
            />
        </div>
    );
}

function InputField({
    getArticles,
    userInput,
    setUserInput,
    setIsLoading,
}) {
    const inputRef = React.useRef();

    React.useEffect(() => {
        inputRef.current.focus();
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        const enteredData = userInput.trim();
        const regex = /^[a-z0-9 ]+$/i;
        if (regex.test(enteredData)) {
            getArticles(enteredData);
        } else {
            setIsLoading("Search userInput may only contain letters or numbers");
        }
    }

    function handleChange(event) {
        const val = event.target.value;
        setUserInput(val);
    }

    return (
        <form onSubmit={handleSubmit} className="form-submit">
            <input
                type="text"
                onChange={handleChange}
                value={userInput}
                ref={inputRef}
                placeholder="Search..."
                className="form-input"
                aria-label="Search input field"
            />
            <button type="submit" className="submit-btn">Search</button>
        </form>
    );
}

function NewsResults({ apiData, isLoading }) {
    if (isLoading) {
        return <span className="search-status">{isLoading}</span>;
    } else {
        return (
            <ul className="results">
                {apiData.map((article) => (
                    <NewsDetails article={article} key={article.url} />
                ))}
            </ul>
        );
    }
}

function NewsDetails({ article }) {
    const {
        title,
        content,
        url,
        publishedAt,
        source,
        author
    } = article;

    const articleContent = content.substring(0, 150);
    const articleDate = publishedAt.substring(0, 10).replaceAll("-", "/");

    return (
        <li className="results-list">
            <article>
                <h2>{title}</h2>
                <span className="results-subheading">{author}</span>
                <p>{articleContent}...</p>
                <a href={url} rel="noopener noreferrer" className="results-link">View Full Article --></a>
            </article>
        </li>
    );
}

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <GetNews />
            </main>
            <Footer />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));