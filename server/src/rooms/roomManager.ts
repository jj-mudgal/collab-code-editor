type Client = any;

const rooms = new Map<string, Set<Client>>();

export const joinRoom = (roomId: string, client: Client) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId)!.add(client);
};

export const leaveRoom = (roomId: string, client: Client) => {
  const room = rooms.get(roomId);
  if (!room) return;

  room.delete(client);

  if (room.size === 0) {
    rooms.delete(roomId);
  }
};

export const getRoomClients = (roomId: string) => {
  return rooms.get(roomId) || new Set();
};
