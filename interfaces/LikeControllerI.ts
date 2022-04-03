import {Request, Response} from "express";

/**
 * @file Declares a controller designed for the API of Likes
 */
export default interface LikeControllerI {
    userTogglesTuitLikes (req: Request, res: Response): void;
    findAllTuitsLikedByUser (req: Request, res: Response): void;
    findAllUsersThatLikedTuit (req: Request, res: Response): void;
};