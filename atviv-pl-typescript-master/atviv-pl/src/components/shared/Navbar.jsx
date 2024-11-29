import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Minha App</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Início
        </Link>
        <Link to="/clients" style={styles.link}>
          Clientes
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#ffcc00',
  },
};

export default Navbar;
