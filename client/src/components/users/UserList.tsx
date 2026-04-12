type User = {
  username: string;
  color: string;
};

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div style={{ padding: "10px", borderRight: "1px solid #ccc" }}>
      <h3>Users</h3>
      {users.map((u, i) => (
        <div key={i} style={{ color: u.color }}>
          ● {u.username}
        </div>
      ))}
    </div>
  );
};

export default UserList;
