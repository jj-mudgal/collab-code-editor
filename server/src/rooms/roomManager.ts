type Client = any;

const rooms = new Map<string, Set<Client>>();

export const joinRoom = (roomId: string, client: Client) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId)!.add(client);
};

export const leaveRoom = (roomId: string, client: Client) => {
  rooms.get(roomId)?.delete(client);
};

export const getRoomClients = (roomId: string) => {
  return rooms.get(roomId) || new Set();
};
