import {Request, Response, Router} from 'express'
import { ObjectId } from 'mongodb'
import {photosRepository} from '../repositories/photos-in-memory-repository'

export const photosRouter = Router({})

photosRouter.post('/',
    async (req: Request<{}, {}, { userId: string, imageSrc: string }>, res: Response) => {
        const photo = await photosRepository.createPhoto(new ObjectId(req.body.userId), req.body.imageSrc)
        res.status(201).send(photo)
    })

photosRouter.put('/:id',
    async (req: Request, res: Response) => {
        const isUpdated = await photosRepository.updatePhotoDescription(new ObjectId(req.params.id), req.body.description)
        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

photosRouter.get('/', async (req: Request<{}, {}, {}, { userId?: string }>, res: Response) => {
    const userId = req.query.userId ? new ObjectId(req.query.userId) : null;
    const foundUsers = await photosRepository.findPhotos(userId)
    res.send(foundUsers)
})

photosRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    let photo = await photosRepository.getPhoto(new ObjectId(req.params.id))
    if (photo) {
        res.send(photo)
    } else {
        res.send(404)
    }
})

photosRouter.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    const isDeleted = await photosRepository.deletePhoto(new ObjectId(req.params.id))
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
