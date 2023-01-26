const db = require("../models/index.js");
const { models } = db.sequelize;
const { Watchlist } = models;
exports.createWatchList = async (req, res, next) => {
	try {
		const { id, ...other } = req.body;
		const { title, streaming_app } = req.body;
		if (!title) {
			return res.json({ error: "Title is Mandatory" });
		}
		if (!streaming_app) {
			return res.json({ error: "Streaming app is Mandatory " });
		}
		const data = await Watchlist.create(other);
		return res.json(data);
	} catch (err) {
		console.log(err);
		return res.json({ error: "Failed to create watchlist" });
	}
};

exports.getAllWatchListOfUser = async (req, res) => {
	try {
		const user_id = req.body.id;
		const data = await Watchlist.findAll({ where: { user_id } });
		return res.json(data);
	} catch (err) {
		console.log(err);
		return res.json({ error: "Failed to fetch watch  list of user" });
	}
};

exports.deleteOneWatchList = async (req, res) => {
	try {
		const id = req.body.watchlist_id;
		const data = await Watchlist.destroy({ where: { id } });
		return res.json(data);
	} catch (err) {
		console.log(err);
		return res.json({ error: "Failed to delete watch list" });
	}
};

exports.updateOneWatchList = async (req, res) => {
	try {
		const { id, watchlist_id, ...other } = req.body;
		const data = await Watchlist.update(
			{ ...other },
			{ where: { id: watchlist_id } }
		);
		return res.json(data);
	} catch (err) {
		console.log(err);
		return res.json({ error: "Faile to updaye list" });
	}
};

exports.getOneShow = async (req, res) => {
	try {
		const data = await Watchlist.findOne({
			where: { id: req.body.show_id },
		});
		return res.json(data);
	} catch (err) {
		console.log(err);
		return res.json({ error: "Faile to updaye list" });
	}
};
