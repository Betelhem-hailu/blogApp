const userSocketMap = new Map();
function setupComments(io) {
    io.on("connection", (socket) => {
        const userId = socket.request.session?.userId || extractUserIdFromCookie(socket.request);
        if (userId) {
                userSocketMap.set(userId, socket.id);
                console.log(`User ${userId} registered with socket ${socket.id}`);
            }

         // Join a room for the specific post
         socket.on("joinPost", (postId) => {
            socket.join(postId);
            console.log(`User joined room for post: ${postId}`);
        });

  
      socket.on("disconnect", () => {
        console.log("User disconnected from comments.");
        for (const [uid, sid] of userSocketMap.entries()) {
            if (sid === socket.id) {
                userSocketMap.delete(uid);
                console.log(`User ${uid} removed from socket map.`);
                break;
            }
        }
      });
    });
  }

  function extractUserIdFromCookie(request) {
    const cookie = request.headers.cookie;
    if (!cookie) return null;

    // Assuming you have a token-based cookie like `userId=abc123`
    const match = cookie.match(/userId=([^;]+)/);
    return match ? match[1] : null;
}
  
  module.exports = { setupComments };
  