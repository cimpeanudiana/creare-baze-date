const express = require("express");
const cors = require("cors");
const PORT = 3001;
const { resetDatabase, createElement, getAllElements, getElementById, updateElement, deleteElement }=require("@prisma");
const { database, planModel, subscriberModel } = require("./config.js");
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Methods",
        "Access-Control-Request-Headers",
        "Access-Control-Allow-Origin"
    ],
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
    ]
})
);


app.get("/", (req, res) => {
        app.get("/reset", async (req, res) => {
        try {
            await resetDatabase(db);
            res.status(200).json({ message: "Baza de date a fost resetată cu succes!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/inscrieri", async (req, res) => {
        try {
            const inscrieri = await getAllElements(Inscriere);
            res.status(200).json(inscrieri);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/inscrieri/:id", async (req, res) => {
        try {
            const inscriere = await getElementById(Inscriere, req.params.id);
            if (!inscriere) {
                return res.status(404).json({ message: "Înscrierea nu a fost găsită." });
            }
            res.status(200).json(inscriere);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });



})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

