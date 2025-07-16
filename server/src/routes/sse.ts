import { Router } from "express";

const router = Router();

// Simpan client connections di memory (sementara)
let clients: any[] = [];

router.get("/events", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);

  // Kirim event awal (optional)
  res.write(`data: ${JSON.stringify({ message: "connected" })}\n\n`);

  req.on("close", () => {
    clients = clients.filter((c) => c.id !== clientId);
  });
});

export const sendEventToAllClients = (data: any) => {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(data)}\n\n`)
  );
};

export default router;
