const express=require('express');
const router=express.Router;


// ROUTES

// Return users as HTML
router.get("/users", (req, res) => {
    const html = `
        <ul> 
            ${users.map(user => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

// Return all users as JSON
router.get("/api/users", (req, res) => {
    return res.json(users);
});

// Return single user by ID
router.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
});

// Add a new user
router.post("/api/users", (req, res) => {
    const body = req.body;
    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to write to file" });
        }
        return res.json({ status: "Successfully added", id: newUser.id });
    });
});

// Placeholder for DELETE and PATCH
// app.delete("/api/users/:id", (req, res) => {
//     return res.json({ status: "Pending" });
// });

// app.patch("/api/users/:id", (req, res) => {
//     return res.json({ status: "Pending" });
// });

module.exports=router;