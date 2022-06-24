import User from '../User/User';

import styles from './UserList.module.css';

export const UserList = ({ users }) => {
  return (
    <ul className={styles['user-list__ul']}>
      {users.map((user) => (
        <User key={user.id} name={user.username} age={user.age} />
      ))}
    </ul>
  );
};

export default UserList;
