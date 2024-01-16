export function test(server) {
    server.get("/test", (req,res) => {
        res.send("working");
    });
}