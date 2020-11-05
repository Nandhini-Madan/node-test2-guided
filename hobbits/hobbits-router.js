const express = require("express")
const Hobbits = require("./hobbits-model")
//const hobbits=require("./hobbits/hobbits-model")
const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await Hobbits.find())
	} catch (err) {
		next(err)
	}
})
router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id
		const user = await Hobbits.findById(id)
		if (!user) {
			res.status(404).json({
				message: "hobbit not found"
			})
		}
		res.status(200).json(user)
	}
	catch (err) {
		next(err)
	}
	router.post("/", async (req, res) => {
		try {
			const hobbit = await Hobbits.create(req.body)
			res.status(201).json(hobbit)
		}
		catch (err) {

		}
	})

})

module.exports = router