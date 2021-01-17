const express = require('express');
const ENV = require('./utils/Env');
const qs = require('qs');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const stateSecretAzure = ENV.get("AZURE_STATE", 'RANDOMID@@--123');
const stateAzure = Buffer.from(stateSecretAzure).toString('base64')
const redirectUrlAzure = ENV.get("AZURE_REDIRECT", "http://localhost:4000/auth/microsoft");
const scopeAzure = "calendars.readwrite";
const azureIdAzure = ENV.get("AZURE_ID");
const secretAzure = ENV.get("AZURE_SECRET");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/outlook', (req, res) => {
	try {
		const urlRequestAuthor = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${azureIdAzure}&response_type=code&redirect_uri=${redirectUrlAzure}&response_mode=query&scope=${scopeAzure}&state=${stateAzure}`;
		return res.status(301).redirect(urlRequestAuthor)
	} catch (error) {
		return res.status(401).send("Redirect Fail")
	}
});
app.get('/auth/microsoft', async (req, res) => {
	const code = req.query.code;
	console.log("Code :", code)
	const uri = "http://localhost:4000/code";
	const data = {
		code: code
	};
	const options1 = {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		data: JSON.stringify(data),
		url: uri,
	};
	try {
		await axios(options1);
		res.send("POst Code ok")
		return;
	} catch (error) {
		res.send("error")
		return;
	}
});

app.post('/code', async (req, res) => {
	const code = req.body.code;
	const urlGetToken = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
	let data = {
		client_id: azureIdAzure,
		scope: scopeAzure,
		code: code,
		redirect_uri: redirectUrlAzure,
		grant_type: "authorization_code",
		client_secret: secretAzure,
		response_mode: "form_post"
	};
	const options = {
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		data: qs.stringify(data),
		url: urlGetToken,
	};
	try {
		const result = await axios(options);
		const accessTokenAzure = result.data.access_token;
		console.log(accessTokenAzure)
		
		console.log(result3);
		return res.send("");
	} catch (e) {
		console.log(e)
		return res.send(e)
	}
});

app.listen(port, (req, res) => {
	console.log(`Server start on port :${port}`)
});
