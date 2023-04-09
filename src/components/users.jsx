import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((users) => users !== id));
  };

  const rowCount = users.length;
  const handleBage = () => {
    return rowCount === 0
      ? 'Никто сегодня с тобой не тусует'
      : `${rowCount} человек сегодня с тобой тусует`;
  };
  const getBageClasses = () => {
    return rowCount === 0 ? 'badge bg-secondary' : 'badge bg-primary';
  };

  return (
    <>
      <h1>
        <span className={getBageClasses()}>{handleBage()}</span>
      </h1>
      {rowCount > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Професия</th>
              <th scope="col">Встретился раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((users) => (
              <tr key={users.id}>
                <td>{users.name}</td>
                <td>
                  {users.qualities.map((qualities) => (
                    <span key={qualities.name} className={'badge m-2 bg-' + qualities.color}>
                      {qualities.name}
                    </span>
                  ))}
                </td>
                <td>{users.profession.name}</td>
                <td>{users.completedMeetings}</td>
                <td>{users.rate} / 5</td>
                <td>
                  <button
                    className="btn btn-danger position-relative"
                    onClick={() => handleDelete(users)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
