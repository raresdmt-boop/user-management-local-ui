type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

import {useState} from "react";

export default function UserList() {

  const [users, setUsers] = useState<User[]>([
    {id: 1, firstName: "Bogdan", lastName: "Alexandrescu", email: "bogdan@gmail.com", age: 41},
    {id: 2, firstName: "Radu", lastName: "Popescu", email: "radu@gmail.com", age: 17},
    {id: 3, firstName: "Paula", lastName: "Mateescu", email: "paula@gmail.com", age: 31},
    {id: 4, firstName: "Gabriela", lastName: "Tanase", email: "gabriela@gmail.com", age: 22},
    {id: 5, firstName: "Carmen", lastName: "Balan", email: "carmen@gmail.com", age: 15}
  ]);

  function remove(id: number) {
    setUsers(users.filter(user => user.id !== id));
  }


  return (
      <>
        <h1 className={"page-title"}>Utilizatori ({users.length > 0 ?
            (users.length) : ("Niciun utilizator")
        })</h1>
        {users.map((user) => (
            <span className={user.age < 18 ? "badge badge-warning" : "badge badge-neutral"}>
            <tr key={user.id}>
              <td>{user.firstName[0]}{user.lastName[0]}</td>
              <td>{user.firstName} {user.lastName}<br />{user.email}</td>
              <td>{user.age} ani</td>
              <td><button>Editeaza</button>
                <button onClick={() => remove(user.id)}>Sterge</button></td>
            </tr>
            </span>
        ))}
        {users.length === 0 && <tr><td colSpan={3}>Niciun utilizator</td></tr>}
      </>
  );
}