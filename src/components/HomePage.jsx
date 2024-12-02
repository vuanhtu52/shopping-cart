const HomePage = () => {
    let lst = [];
    for (let i = 0; i < 100; i++) {
        lst.push(i);
    }

    return (
        <div>
            Home page
            {/* {lst.map((i) => (
                <div key={i}>Hello</div>
            ))} */}
        </div>
    );
};

export default HomePage;
