import Nav from '../reactcodes/Nav.js';
import classes from '../reactcodes/style/Layout.module.css';

export default function Layout({ children }) {
    return (
      <>
        <Nav />
        <main className={classes.main}>
          <div className={classes.container}>{children}</div>
        </main>
      </>
    );
  }
  