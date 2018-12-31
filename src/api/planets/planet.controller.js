import HTTPStatus from 'http-status';
import Planet from './planet.model';

const notFoundMessage = 'resource not found';

export async function findById(req, res) {
    try {

        const id = req.params.id;

        const planet = await Planet.findById(id);

        if (!planet) {
            return res.status(HTTPStatus.NOT_FOUND).json({ err: notFoundMessage });
        }

        return res.status(HTTPStatus.OK).json(planet);

    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function findAll(req, res) {
    try {
        let query = {};

        const nameFilter = req.query.name;

        if (nameFilter) query.name = nameFilter;

        const planets = await Planet.find(query);

        return res.status(HTTPStatus.OK).json(planets);
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function create(req, res) {
    try {
        const newPlanet = await Planet.create(req.body);
        return res.status(HTTPStatus.CREATED).json(newPlanet);
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function deleteById(req, res) {
    try {
        const id = req.params.id;

        const queryResult = await Planet.deleteOne({ '_id': id });

        if (!queryResult.n) {
            return res.status(404).json({ err: notFoundMessage });
        }

        return res.status(HTTPStatus.NO_CONTENT).send();
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}
