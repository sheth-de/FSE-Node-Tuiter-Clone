import {Request, Response} from "express";

export default interface LikeControllerI {
    userTogglesTuitLikes (req: Request, res: Response): void;
    findAllTuitsLikedByUser (req: Request, res: Response): void;
    findAllUsersThatLikedTuit (req: Request, res: Response): void;
};