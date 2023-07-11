const express = require('express');
const AuthGitHubRouter = express.Router();
const CONFIG = require('../../config.js');
const axios = require('axios');


AuthGitHubRouter.post("/", async (req, res) => {
    try {
        const { code } = req.body;
        
        const data = new FormData();
        data.append("client_id", CONFIG.client_id);
        data.append("client_secret", CONFIG.client_secret);
        data.append("code", code);
        data.append("redirect_uri", CONFIG.redirect_uri);

        // Request to exchange code for an access token
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                "client_id": CONFIG.client_id,
                "client_secret": CONFIG.client_secret,
                "code": code,
                "redirect_uri": CONFIG.redirect_uri,
            }
        );
        const params = new URLSearchParams(tokenResponse.data);
        const access_token = params.get('access_token');

        // Request to return data of a user that has been authenticated
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${access_token}`,
            },
        });
        const userData = userResponse.data;
        return res.send(userData);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

module.exports = AuthGitHubRouter;