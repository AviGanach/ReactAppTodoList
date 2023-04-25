import propTypes from 'prop-types';
import styles from './style.module.css';

const Header = (props) => {

 //--- get image & title from 'App' parent component---// 
 const {imgLogo,title} = props

  return (
    <div className="container">
    <img className={styles.imgLogo} src={imgLogo} alt="logo" />
        <h1 className={styles.titleLogo}>{title}</h1>
        <br />
    </div>
  );
};

Header.propTypes = {
    imgLogo: propTypes.string,
    title: propTypes.string
  };

export default Header;