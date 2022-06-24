import styles from './User.module.css';

export const User = ({ name, age }) => {
  return <li className={styles['user']}>{`${name} (${age} year(s) old)`}</li>;
};

export default User;
