const Header = () => {
    return (
        <nav>
            <a href="index.html" className="logo">
                <img src="assets/images/logo.png" alt="logo"/>
                <h1>Online Store</h1>
            </a>
            <ul className="nav-icons">
                <li><a href="browse.html"><img src="assets/icons/compass.svg" alt="browse"/></a></li>
                <li><a href="search.html"><img src="assets/icons/search.svg" alt="search"/></a></li>
                <li><a href="cart.html"><img src="assets/icons/cart-shopping.svg" alt="cart"/></a></li>
            </ul>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="footer-content">
                    <h2>Online Store</h2>
                    <p>
                        This is a concept for an online store made for CAP 4104: Human Computer Interaction. 
                        This store is designed to be user-friendly and easy to navigate based on the principles of HCI.
                        The store is designed to be simple and easy to use, with a focus on the user experience. 
                        To see the concepts behind the store, visit the following link:&nbsp;
                        <a href="https://project.zanderp25.com/" target="_blank">Project Site</a>.
                    </p>
                    <p>
                        This work includes icons from the Dazzle Line Icons Collection by Dazzle UI, used under the&nbsp;
                        <a href="https://www.svgrepo.com/page/licensing/#CC%20Attribution" target="_blank">
                            Creative Commons Attribution License</a>.
                        The icons are used for the purpose of this project and are not intended for commercial use. 
                        The icon pack can be found here:&nbsp;
                        <a href="https://www.svgrepo.com/collection/dazzle-line-icons/" target="_blank">
                            Dazzle Line Icons Collection</a>.
                    </p>
                </div>
                <div className="footer-links">
                    <div className="footer-content">
                        <h2>Quick Links</h2>
                        <ul>
                            <li><a href="index.html">Categories</a></li>
                            <li><a href="browse.html">Browse</a></li>
                            <li><a href="search.html">Search</a></li>
                            <li><a href="cart.html">Cart</a></li>
                        </ul>
                    </div>
                    <div className="footer-content">
                        <h2>Connect</h2>
                        <ul>
                            <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                            <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                            <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                            <li><a href="https://www.linkedin.com" target="_blank">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Online Store. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

const loadComponents = () => {
    const headerContainer = document.createElement('div');
    const footerContainer = document.createElement('div');

    document.body.insertBefore(headerContainer, document.body.firstChild);
    document.body.appendChild(footerContainer);

    const headerRoot = ReactDOM.createRoot(headerContainer);
    const footerRoot = ReactDOM.createRoot(footerContainer);

    headerRoot.render(<Header />);
    footerRoot.render(<Footer />);
};