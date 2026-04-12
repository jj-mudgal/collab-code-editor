type User = {
  username: string;
  color: string;
};

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div
      style={{
        width: "200px",
        padding: "10px",
        borderRight: "1px solid #ccc",
        background: "#f9f9f9",
      }}
    >
      <h3>Active Users</h3>
      {users.map((u, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              background: u.color,
              borderRadius: "50%",
              marginRight: "8px",
            }}
          />
          {u.username}
        </div>
      ))}
    </div>
  );
};

export default UserList;
