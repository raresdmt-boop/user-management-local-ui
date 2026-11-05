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
    {id: 5, firstName: "Carmen", lastName: "Balan", email: "carmen@gmail.com", age: 15},
    {id: 6, firstName: "Ilie", lastName: "Bolojan", email: "bolojan@gmail.com", age: 51}
  ]);

  const [search, setSearch] = useState<string>("");

  const [searchMinAge, setSearchMinAge] = useState<string>("");

  const [firstName, setFirstName] = useState<string>("");

  const [lastName, setLastName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [age, setAge] = useState<number>(0);

  const [nextId, setNextId] = useState<number>(7);

  const [editedId, setEditedId] = useState<number>(0);

  const emailError: string = email !== "" &&
  !email.includes("@") ? "Email invalid: lipseste @" : "";

  const ageError: string = age !== 0 &&
      (age < 0 || age > 120) ? "Varsta invalida" : "";

  const canSave: boolean = firstName !== "" && lastName !== "" && age > 0 && emailError === "";

  const filteredUsers = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      &&
      (searchMinAge === "" || user.age >= Number(searchMinAge))
  );

  function remove(id: number) {
    setUsers(users.filter(user => user.id !== id));
  }

  function averageAge(users: User[]): number {
    if( users.length === 0 ) {
      return 0;
    }
    const total = users.reduce((sum, user) => sum + user.age, 0);

    return Math.round(total/users.length);
  }

  function minors(users: User[]): number {
    let minorsNumber = 0;

    for(let i = 0; i < users.length; i++) {
      if(users[i].age < 18) {
        minorsNumber++;
      }
    }
    return minorsNumber;
  }

  function adults(users: User[]): number {
    let adultsNumber = 0;

    for(let i = 0; i < users.length; i++) {
      if(users[i].age >= 18) {
        adultsNumber++;
      }
    }
    return adultsNumber;
  }

  function addUser() {

    if(editedId !==0) {
      setUsers(users.map(user =>
      user.id === editedId ? {...user, firstName, lastName, email, age}
          : user
      ));

      setEditedId(0);
      setAge(0);
      setEmail("");
      setFirstName("");
      setLastName("");
      return;
    }

    const newUser: User = {
      id: nextId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age
    };
    setUsers([...users, newUser]);
    setNextId(nextId + 1);
    setAge(0);
    setEmail("");
    setFirstName("");
    setLastName("");
  }

  function reset() {
    setAge(0);
    setEmail("");
    setFirstName("");
    setLastName("");
  }

  function edit(user: User) {
    setEditedId(user.id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setAge(user.age);
  }



  return (


      <>
        <div className="page-header">
          <div>
            <h1 className="page-title">Utilizatori {users.length > 0 ?
                `(${users.length})` : "(Niciun utilizator)"}
            </h1>
            <p className="page-subtitle">Lista completa, cu filtrare si paginare pe server.</p>
          </div>
          <button
              onClick={() => {
                addUser()
              }}
              className="btn btn-primary">Utilizator nou
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total utilizatori <span className="endpoint-tag">GET /api/users</span></div>
            <div className="stat-value">{users.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Varsta medie <span className="endpoint-tag">GET /average-age</span></div>
            <div className="stat-value">{averageAge(users)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Minori <span className="endpoint-tag">GET /count?youngerThan=18</span></div>
            <div className="stat-value">{minors(users)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Adulti <span className="endpoint-tag">GET /adults?minAge=18</span></div>
            <div className="stat-value">{adults(users)}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Utilizator nou</h2>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Prenume</label>
                <input className="form-input"
                       type="text"
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nume</label>
                <input className="form-input"
                       type="text"
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input"
                       type="text"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
                <span className="form-error">{emailError}</span>
              </div>
              <div className="form-group">
              <label className="form-label">Varsta</label>
                <input className="form-input"
                       type="number"
                       value={age}
                       onChange={(e) => setAge(Number(e.target.value))}
                />
                <span className="form-error">{ageError}</span>
              </div>
            </div>
            <div className="form-actions">
              <button onClick = {reset}
                  className="btn btn-outline">Renunta</button>
              <button disabled={!canSave}
                  onClick = {addUser}
                  className="btn btn-primary">Salveaza</button>
            </div>
          </div>
        </div>

        <div className="card">

          <div className="table-toolbar">
            <div className="table-filters">
              <input
                  type="search"
                  className="form-input table-search"
                  placeholder="Caută după nume..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
              <input
                  type="number"
                  className="form-input"
                  placeholder="Varsta minima"
                  value={searchMinAge}
                  onChange={(e) => setSearchMinAge(e.target.value)}
              />
              <select className="form-select">
                <option>Sorteaza: nume (A-Z)</option>
                <option>Sorteaza: nume (Z-A)</option>
                <option>Sorteaza: varsta (crescator)</option>
                <option>Sorteaza: varsta (descrescator)</option>
              </select>
              <button className="btn btn-outline btn-sm">Reincarca</button>
            </div>
            <span className="endpoint-tag">GET /api/users/search</span>
          </div>

          <table>
            <thead>
            <tr>
              <th>Utilizator</th>
              <th>Varsta</th>
              <th>Identificator</th>
              <th className="text-right">Actiuni</th>
            </tr>
            </thead>
            <tbody>


            {filteredUsers.map((user) => (

                <tr key={user.id}>
                  <td>{user.firstName} {user.lastName}<br/>{user.email}</td>
                  <td>
                    <span className={user.age < 18 ? "badge badge-warning" : "badge badge-neutral"}>
                      {user.age} ani
                    </span>
                  </td>
                  <td>{user.firstName[0]}{user.lastName[0]}</td>
                  <td>
                    <button onClick = {() => edit(user)}
                        className="btn btn-outline btn-sm">Editeaza</button>
                    <button onClick={() => {
                      remove(user.id)
                    }} className="btn btn-danger btn-sm">Sterge
                    </button>
                  </td>
                </tr>
            ))}

            {users.length === 0 && (
                <tr>
                  <td colSpan={4}>Niciun utilizator</td>
                </tr>
            )}
            </tbody>
          </table>


          <div className="pagination">
            <span className="pagination-info">Pagina 1 din 2 &middot; {users.length} utilizatori in total</span>
            <div className="pagination-pages">
              <button className="btn btn-outline btn-sm" disabled>Inapoi</button>
              <button className="btn btn-primary btn-sm">1</button>
              <button className="btn btn-outline btn-sm">2</button>
              <button className="btn btn-outline btn-sm">Inainte</button>
            </div>
          </div>

        </div>

      </>
  );
}
