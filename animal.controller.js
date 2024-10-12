/*const Animals = require('./animal.model')

const Animal = {
	list: async (req, res) => {
		const animals = await Animals.find()
		res.status(200).send(animals)
	},
	create: async (req, res) => {
		const animal = new Animals(req.body)
		await animal.save()
		res.status(201).send('chanchito creado!')
	},
	update: async (req, res) => {
		res.status(204).send('actualizando chanchito')
	},
	destroy: async (req, res) => {
		const { id } = req.params
		const animal = await Animals.findOne({ _id: id })
    	await animal.remove()
		res.status(204).send('eliminando chanchito :(')
	}
}

module.exports = Animal
*/

const Animals = require('./animal.model')

const Animal = {
	list: async (req, res) => {
		try {
			const animals = await Animals.find()
			res.status(200).send(animals)
		} catch (error) {
			res.status(500).send({ message: 'Error fetching animals', error })
		}
	},
	create: async (req, res) => {
		try {
			const animal = new Animals(req.body)
			await animal.save()
			res.status(201).send('Chanchito creado!')
		} catch (error) {
			res.status(500).send({ message: 'Error creating animal', error })
		}
	},
	update: async (req, res) => {
		res.status(204).send('Actualizando chanchito')
	},
	destroy: async (req, res) => {
		try {
			const { id } = req.params
			const animal = await Animals.findOne({ _id: id })
			
			// Verificar si el animal existe antes de intentar eliminarlo
			if (!animal) {
				return res.status(404).send({ message: 'Animal not found' })
			}
			
			await animal.remove()
			res.status(204).send('Eliminando chanchito :(')
		} catch (error) {
			// Manejo de errores genéricos o problemas con el ID
			res.status(500).send({ message: 'Error deleting animal', error })
		}
	}
}

module.exports = Animal
