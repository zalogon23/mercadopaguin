const express = require('express');
const cors = require('cors');
const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: process.env.MERCADO_SECRET,
});
const app = express();

app.use(cors({
    origin: true
}))
app.use(express.json())

app.post("/create_preference", (req, res) => {

    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }
        ],
        back_urls: {
            success: "chocolate.zarate.team",
            pending: "chocolate.zarate.team",
            failure: "chocolate.zarate.team"
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id
            });
        }).catch(function (error) {
            console.log(error);
            res.json(error)
        });
});


app.listen(3000)